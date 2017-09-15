/* global jQuery nunjucks Cookies */

;(function ($) {
  // This is a function for the clarity prototype tool which allows data to be pulled in to components if the function is invoked.
  $.fn.moji_rewriter = function (agency) {
    agency = (!agency) ? Cookies.getJSON('agency').shortcode : agency
    // As this is not to be used in production it makes sense to register the components here instead of looking for a class.
    var componentList = ['c-logo-bar', 'c-main-nav-bar', 'c-social-links', 'c-news-widget', 'c-blog-feed', 'c-my-work', 'c-quick-links', 'c-common-resources', 'c-further-resources']

    var rewrite = function (newData) {
      var env = new nunjucks.Environment(new nunjucks.WebLoader('/views'))
      var loadView = function (view) {
        var $componentBody = $('.' + view)
        var template = env.getTemplate(view + '.html')
        var renderData = {}
        $.each(window.globalData, function (index, value) {
          if (index !== 'agency') {
            renderData[index] = value
          } else {
            renderData.agency = newData
          }
        })

        $.each(window.pageData, function (index, value) {
          renderData[index] = value
        })
        $.each(window.agencyData, function (index, value) {
          renderData[index] = value
        })

        $componentBody.replaceWith(
          env.render(template, renderData)
        )
      }

      $.each(componentList, function () {
        loadView(this)
      })
    }

    // Load in the correct agency based on the 'agency' variable
    $.getJSON('model/agency.json', function (data) {
      // The window needs agencies to be in a global variable so do this first
      window.agencyData = data
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
