/* global jQuery location */

;(function ($) {
  /**
  * Ensures that in a set of elements, they all have an equal height (equal to the height of the largest elemement)
  *
  * Usage: Simply add your container element to script-loader.js and add .moji_equaliser() on to it.
  * Make sure you reference the container and child elements. e.g. $('.c-news-list > .js-article-item').moji_equaliser()
  *
  */
  $.fn.moji_changeAgency = function () {
    var container = this
    var currentPage = (location.pathname.substring(1)) ? location.pathname.substring(1).replace('.html', '') : 'index'
    var currentAgency = $('body').data('agency')
    container.find('li > a').on('click', function (e) {
      e.preventDefault()
      var changeAgency = $(this).parent().data('agency')
      $('body').removeClass('agency-' + currentAgency).addClass('agency-' + changeAgency).attr('data-agency', changeAgency)
    })
    return container
  }
})(jQuery)
