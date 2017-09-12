/* global jQuery nunjucks */

;(function ($) {
  // This is a function for the clarity prototype tool which allows data to be pulled in to components if the function is invoked.
  $.fn.moji_rewriter = function (agency) {
    // As this is not to be used in production it makes sense to register the components here instead of looking for a class.
    var componentList = ['c-logo-bar']
    var env = new nunjucks.Environment(new nunjucks.WebLoader('/views'))

    var loadView = function (view) {
      var $componentBody = $('.' + view)
      var template = env.getTemplate(view + '.html')
      $componentBody.replaceWith(
        env.render(template, {
          agency: window.globalData.agency
        })
      )
    }

    $.each(componentList, function () {
      loadView(this)
    })
    return this
  }
})(jQuery)
