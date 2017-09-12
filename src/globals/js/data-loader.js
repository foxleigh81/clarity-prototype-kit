/* global jQuery Cookies */

// Takes data from a json file and loads it into a global variable
;(function ($) {
  $.fn.moji_dataLoader = function () {
    // First check for a cookie to make sure it's not already been loaded
    if (typeof Cookies.get('agency') === 'undefined') {
      // Get global data and attach it to a global variable
      $.getJSON('model/globals.json', function (data) {
        window.globalData = data
        Cookies.set('agency', data.agency)
      })
    }
    return this
  }
})(jQuery)
