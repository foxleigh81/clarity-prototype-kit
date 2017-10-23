/* global jQuery */

;(function ($) {
  $.fn.moji_featuredNews = function () {
    var element = $(this)
    var articles = element.find('.c-article-item')
    for (var i = 0; i < articles.length; i++) {
      $(articles[i]).addClass('article-' + (i + 1) + '-of-' + articles.length)
    }
    return element
  }
})(jQuery)
