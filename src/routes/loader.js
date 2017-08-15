var express = require('express');
var router = express.Router();
var index = require('../json/index.json');
var pages = require('../json/pages.json');

var errorPage = function(req, res) {
  res.render('error', {
    type: 'error',
    page: {
      code: '404',
      title: 'Error 404: No page found at \'' + req.url +'\'',
      message : 'You seem to have to hit his page in error.'
    }
  });
}

router.get('/', (req, res) => {
  res.render('index', {
    type: 'index',
    page: index
  })
});

// if the user hits a non-existing route, then show a 404 error on the utility template.
router.get('*', (req, res) => {
  errorPage(req, res);
});

module.exports = router;
