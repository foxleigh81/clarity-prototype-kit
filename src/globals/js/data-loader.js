/* global jQuery Cookies */

// Takes data from a json file and loads it into a global variable
;(function ($) {
  $.fn.moji_dataLoader = function () {
    // Get global data and attach it to a global variable
    $.getJSON('model/globals.json', function (data) {
      // Check to see if a cookie has been set and set one if not.
      if (typeof Cookies.get('agency') === 'undefined') {
        window.globalData = data
        Cookies.set('agency', data.agency)
      } else {
        window.globalData = data
        window.globalData.agency = Cookies.get('agency')
      }
    })
    var currentPage = (document.location.pathname !== '/') ? document.location.pathname.match(/[^/]+$/)[0].replace('.html', '') : 'index'
    // Get the current page data and attach that to a global variable too
    $.getJSON('model/' + currentPage + '.json', function (data) {
      window.pageData = data
    })
    return this
  }
})(jQuery)
