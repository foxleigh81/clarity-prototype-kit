/* global jQuery Cookies */

;(function ($) {
  
  $.fn.moji_polls = function () {
    var container = this
    var form = $(this).find('form')

    form.on('submit', function (e) {
      e.preventDefault()
      console.log(Cookies.get('polls'))
    })
    return container
  }
})(jQuery)
