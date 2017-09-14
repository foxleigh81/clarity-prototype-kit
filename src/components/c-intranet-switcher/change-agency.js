/* global jQuery location Cookies */

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
    // HQ is the default unless there is a cookie specifying otherwise
    var currentAgency = (Cookies.get('agency')) ? Cookies.getJSON('agency').shortcode : 'hq'
    $('body').removeClass(function (index, className) {
      return (className.match(/(^|\s)agency-\S+/g) || []).join(' ')
    }).addClass('agency-' + currentAgency)
    
    container.find('li > a').on('click', function (e) {
      e.preventDefault()
      var changeAgency = $(this).parent().data('agency')
      $('body').removeClass(function (index, className) {
        return (className.match(/(^|\s)agency-\S+/g) || []).join(' ')
      }).addClass('agency-' + changeAgency)
      
      // Get data for current page and attach to global variable
      $.getJSON('model/' + currentPage + '.json', function (data) {
        window.pageData = data
      })
      $('body').moji_rewriter(changeAgency)
    })
    return container
  }
})(jQuery)
