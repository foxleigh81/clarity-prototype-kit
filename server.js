var express = require('express');

// Express middleware
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var compression = require('compression')

// Route loader
var routes = require('./src/routes/loader');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'html');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(morgan('dev'));

// Gzip content
app.use(compression());

// Set Favicon
app.use(favicon(__dirname + '/dist/static/images/site-icons/favicon.ico'));

// Set a static files folder (css, images etc...)
app.use('/static', express.static(path.join(__dirname, 'dist/static')));

// Set a components folder
app.use('/components', express.static(path.join(__dirname, 'dist/components')));

app.use('/', routes);

app.listen(port);

console.log('Clarity prototype kit is running on localhost:'+port);
