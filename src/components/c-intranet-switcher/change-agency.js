/* global jQuery */

;(function ($) {
  $.fn.moji_changeAgency = function () {
    var container = $(this).parents('li')

    container.on('click', function () {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open')
      } else {
        $(this).addClass('open')
      }
    }).css('cursor', 'pointer')
    return container
  }
})(jQuery)
