var gulp        = require('gulp'),
    gulpif      = require('gulp-if'),
    gutil       = require('gulp-util'),
    chalk       = require('chalk'),
    argv        = require('yargs').argv,
    fs          = require('fs'),
    browserSync = require('browser-sync'),
    addsrc      = require('gulp-add-src'),
    concat      = require('gulp-concat'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    plumber     = require('gulp-plumber'),
    notifier    = require('node-notifier'),
    cssnano     = require('gulp-cssnano'),
    jsonlint    = require('gulp-jsonlint'),
    del         = require('del'),
    standard    = require('gulp-standard'),
    stylus      = require('gulp-stylus'),
    jeet        = require('jeet'),
    rupture     = require('rupture'),
    csso        = require('gulp-csso'),
    extReplace  = require('gulp-ext-replace'),
    runSequence = require('run-sequence'),
    uglify      = require('gulp-uglify'),
    cmq         = require('gulp-merge-media-queries'),
    nunjucks    = require('gulp-nunjucks-html'),
    path        = require('path'),
    rename      = require('gulp-rename'),
    data        = require('gulp-data'),
    webpack     = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server'),
    reload      = browserSync.reload;


// watch files for changes and reload
gulp.task('serve', function() {
  'use strict';
  browserSync.init({
      server: {
          baseDir: './dist'
      },
      // Change the default port
      port: 3000,
      // All open instances of the site will reload if the server is restarted
      reloadOnRestart: true,
      // // Don't show any notifications in the browser.
      notify: false,
      // // Sync actions between devices
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: false
      }
  });
  // Perform the site init
  runSequence('build');

  // Compile Standard JS
  gulp.watch('src/**/*.js', ['scripts'], reload);

  // Compile Stylus
  gulp.watch('src/**/*.styl', ['styles']);

  // Compile Standard JS
  gulp.watch('src/images', ['images'], reload);

  // Compile HTML and JSON
  gulp.watch(['src/components/**/*.njk', 'src/templates/**/*.njk', 'src/pages/**/*.njk', 'src/model/**/*.json'], ['processHTML'], reload);

  // Show success message
  console.log(chalk.green('✔ Server started!'))
});

var errors = 0,
    supportedBrowsers = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
],

onError = function (err) {
  'use strict';
  console.log(chalk.red('✘ Build failed!'))
  notifier.notify({ title: 'Build', message: 'Failed'});
  console.log(err);
  errors = errors+1
  this.emit('end');
};

// Combine styles
/* styles task */
gulp.task('stylus', function () {
  return gulp.src([
    // add your Stylus files here, they will be combined in this order (exclude print and ie styles)
    'src/globals/css/*.styl',
    '!src/**/*.print.styl',
    '!src/**/*.ie.styl',
    'src/components/**/*.styl'
  ])
    // Plumber is there to catch errors in the pipes
    .pipe(plumber())
    // Process the css using stylus
    .pipe(stylus({
      'include css': true,
      use: [jeet(), rupture()]
    }))
    // combine all the files to a single file
    .pipe(concat('core.css'))
    // move the file to the assets folder
    .pipe(gulp.dest('dist/static/css'))
    // Reload the browser CSS after every change
    .pipe(browserSync.stream())
})

gulp.task('print', function () {
 // Process print styles as seperate stylesheets
  return gulp.src('src/**/*.print.styl')
    .pipe(plumber())
    .pipe(stylus({
      'include css': true
    }))
    .pipe(concat('print.css'))
    // move the file to the assets folder
    .pipe(gulp.dest('dist/static/css'))
    // Reload the browser CSS after every change
    .pipe(browserSync.stream())
})

gulp.task('ie', function () {
 // Process ie styles as seperate stylesheets
  return gulp.src('src/**/*.ie.styl')
    .pipe(plumber())
    .pipe(stylus({
      'include css': true,
      use: [jeet(), rupture()]
    }))
    .pipe(concat('ie.css'))
    // move the file to the assets folder
    .pipe(gulp.dest('dist/static/css'))
    // Reload the browser CSS after every change
    .pipe(browserSync.stream())
})

gulp.task('postcss', function () {
  return gulp.src('dist/static/css/*.css')
  .pipe(plumber())
  // Group all media queries together
  .pipe(cmq())
  // Use CSSO to remove redundant code and group the same code together
  .pipe(csso())
  // Use CCSNano to minify the code and add browser prefixes
  .pipe(
    cssnano({
      autoprefixer: { browsers: supportedBrowsers, add: true }
    })
  )
  // Add .min to the end
  .pipe(rename({ suffix: '.min' }))
  // move the file to the assets folder
  .pipe(gulp.dest('dist/static/css'))
  .pipe(browserSync.stream())
})

gulp.task('styles', function (done) {
  runSequence('clean-styles', 'stylus', 'print', 'ie', 'postcss', function () {
    done()
  })
})

// Move 3rd party libraries to the assets/vendors folder
// Note: This will probably be replaced with require.js
gulp.task('vendors', function () {
  // Move jQuery, ie.js and any files in src/vendors
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/ie8-js/js/build/ie8-js-html5shiv.js',
    'src/vendors/**/*'
  ])
  .pipe(gulp.dest('src/static/vendors'))
})

// Move static content to assets folder
gulp.task('static', function (done) {
  // Move fonts
  gulp.src('src/globals/fonts/**/*')
    .pipe(gulp.dest('src/static/fonts'))
  // Move Favicons
  gulp.src('src/globals/images/icons/*')
    .pipe(gulp.dest('src/static/icons'))
  done()
})

// Move json
gulp.task('model', function() {
  'use strict';
  return gulp.src([
    'src/model/**/*',
    ])
    .pipe(plumber(
      { errorHandler: onError }
    ))
    .pipe(gulp.dest('dist/model'))
});

/* Scripts task */
gulp.task('scripts', function () {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    'src/components/**/*.js',
    'src/globals/js/*.js'
  ])
  // Plumber is there to catch errors in the pipes
  .pipe(plumber())
  // Lint the code using standardjs
  .pipe(standard())
  .pipe(standard.reporter('default', {
    breakOnError: true,
    quiet: true
  }))
  // combine all the files to a single file
  .pipe(concat('core.js'))
  // Add .min to the end
  .pipe(rename({ suffix: '.min' }))
  // Compress the file
  .pipe(uglify({
    ie8: true,
    mangle: { reserved: ['$', 'jQuery'] }
  }))
  // Move the file to the assets folder
  .pipe(gulp.dest('dist/static/js'))
  // Reload the browser JS after every change
  .pipe(browserSync.stream())
})

//Make sure the json data is correctly formed
gulp.task('testModel', function() {
  'use strict';
  return gulp.src('./src/model/**/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

// Move robots.txt to site root
gulp.task('robots', function() {
  'use strict';
  return gulp.src('robots.txt')
    .pipe(gulp.dest('dist'))
});

gulp.task('processHTML', function() {
  'use strict';
  return gulp.src('src/pages/*.njk')
    .pipe(plumber(
      { errorHandler: onError }
    ))
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('src/model/' + path.basename(file.path, '.njk') + '.json'));
    }))
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync('src/model/globals.json'));
    }))
    .pipe(nunjucks({
      searchPaths: ['src/pages', 'src/components', 'src/templates']
    }))
    .pipe(extReplace('.html'))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream:true}))
});

var prodBuild = ['clean', 'styles','vendors', 'static','scripts','images','processHTML','robots', 'notify'],
    devBuild = ['clean', 'styles','vendors', 'static','scripts','images','processHTML','notify'],
    buildTasks = argv.prod ? prodBuild : devBuild;

// Perform Basic Build (note, don't call directly, use build:dev or build)
gulp.task('build', function (callback) {
  'use strict';
  runSequence.apply(
    null,
    buildTasks,
    callback
  );
});


gulp.task('notify', function() {
  'use strict'
  console.log(chalk.green('✔ Build complete!'))
  notifier.notify({ title: 'Build', message: 'Completed'});
})

// Compress and minify images to reduce their file size
gulp.task('images', function() {
  'use strict';
  var imgSrc = 'src/images/**/*',
      imgDst = 'dist/static/images';

  return gulp.src(imgSrc)
    .pipe(plumber())
    .pipe(imagemin({
         progressive: true,
         svgoPlugins: [{removeViewBox: false}],
         use: [pngquant()]
    }))
    .pipe(gulp.dest(imgDst))
});

// delete generated styles
gulp.task('clean-styles', function (done) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del('assets/css')
  done()
})

// Deletes contents of dist folder
gulp.task('clean', function(cb) {
    'use strict';
    return del(['dist/**/*.*'], cb)
});
