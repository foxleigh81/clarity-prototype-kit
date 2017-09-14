/* global jQuery nunjucks Cookies */

;(function ($) {
  // This is a function for the clarity prototype tool which allows data to be pulled in to components if the function is invoked.
  $.fn.moji_rewriter = function (agency) {
    agency = (!agency) ? Cookies.getJSON('agency').shortcode : agency
    // As this is not to be used in production it makes sense to register the components here instead of looking for a class.
    var componentList = ['c-logo-bar']

    var rewrite = function (newData) {
      var env = new nunjucks.Environment(new nunjucks.WebLoader('/views'))
      var loadView = function (view) {
        var $componentBody = $('.' + view)
        var template = env.getTemplate(view + '.html')
        $componentBody.replaceWith(
          env.render(template, {
            agency: newData
          })
        )
      }

      $.each(componentList, function () {
        loadView(this)
      })
    }

    // Load in the correct agency based on the 'agency' variable
    $.getJSON('model/agency.json', function (data) {
      $.each(data.agencies, function (i, data) {
        if (data.shortcode === agency) {
          // update window.globalData.agency with the updated agency data
          Cookies.set('agency', data)
          $('html').moji_dataLoader()
          // rerender any affected components
          rewrite(data)
        }
      })
    })
    return this
  }
})(jQuery)
