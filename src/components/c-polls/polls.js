/* global jQuery Cookies */

;(function ($) {
  /**
  * Ensures that in a set of elements, they all have an equal height (equal to the height of the largest elemement)
  *
  * Usage: Simply add your container element to script-loader.js and add .moji_equaliser() on to it.
  * Make sure you reference the container and child elements. e.g. $('.c-news-list > .js-article-item').moji_equaliser()
  *
  */
  $.fn.moji_polls = function () {
    var container = this
    var form = container.find('form')
    // Get the number of votes from the page and convert the string into an integer
    var voteCount = parseInt(container.find('.js-poll-count').html())
    form.on('submit', function (e) {
      e.preventDefault()
      var inputs = container.find('input[name="answers"]')
      for (var i = 0; i < inputs.length; i++) {
        var element = $(inputs[i])
        var elementCount = parseInt(element.parents('li').data('count'))
        var elementHeight = element.parents('li').height()
        if (element.is(':checked')) {
          elementCount++
          element.parents('li').addClass('selected')
        }
        var percent = elementCount / (voteCount + 1) * 100
        element.parents('li').addClass('active').css('height', elementHeight + 'px').find('.c-polls__answer-bar').css('width', percent + '%')
        element.parent().find('.c-polls__answer').unwrap()
        element.remove()
        container.find('.js-poll-count').html(voteCount + 1)
        container.find('.js-poll-buttons').remove()
      }
    })
    return container
  }
})(jQuery)
