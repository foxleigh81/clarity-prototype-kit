/* global jQuery */

;(function ($) {
  $.fn.moji_toggleMenu = function () {
    var element = $(this)
    element.find('.c-main-nav-bar__menu-button').on('click', function () {
      console.log('clicked, innit')
      if ($(this).find('.u-icon').hasClass('u-icon--menu-down')) {
        // Change the icon
        $(this).find('.u-icon').removeClass('u-icon--menu-down').addClass('u-icon--menu-up')
        // Add a class to the entire header
        element.parent().addClass('menu-active')
      } else {
        // Do the opposite of the above
        $(this).find('.u-icon').removeClass('u-icon--menu-up').addClass('u-icon--menu-down')
        element.parent().removeClass('menu-active')
      }
    }).css('cursor', 'pointer')
  }
})(jQuery)
