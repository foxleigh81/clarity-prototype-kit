/* global jQuery Cookies */

;(function ($) {
  /**
  * Adds intractivity to a poll. Note this was built to work with static data and will need to be altered a little when it has been integrated
  * into wordpress and the api becomes available.
  *
  */
  $.fn.moji_polls = function () {
    var container = this
    var form = container.find('form')
    var thisPollId = form.attr('id')
    // Get the number of votes from the page and convert the string into an integer
    var voteCount = parseInt(container.find('.js-poll-count').html())
    var showResults = function () {
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
    }
    if (typeof Cookies.get('polls_' + thisPollId) !== 'undefined') {
      showResults()
    } else {
      form.on('submit', function (e) {
        e.preventDefault()
        Cookies.set('polls_' + thisPollId, true)
        showResults()
      })
    }
    
    return container
  }
})(jQuery)
