/* global $ */

/*

Script loader

In order to avoid performance issues, scripts are not automatically
loaded when a component is generated. You must explicitly execute your scripts here.

You can attach a script to any element but please put a js- class for any hooks to ensure future proofing.

*/

$(document).ready(function () {
  // Tell the css that JavaScript has loaded successfully
  $('html').removeClass('no-js').addClass('js')
  // When the page loads, check to see which agency is active and then load any appropriate data
  $('html').moji_dataLoader()// .moji_rewriter()
  $('.js-intranet-switcher').moji_changeAgency()
  $('.js-main-nav-bar').moji_toggleMenu()
  // Load scripts
  $('.js-clarity-toolbar').moji_clarityToolbar()
  $('.js-featured-news-list').moji_featuredNews()
  $('.js-article-item').moji_bigTarget('.c-article-item__content > h1 > a')
  $('.js-left-hand-menu').moji_leftHandMenu()
  $('.js-need-to-know-widget').moji_slider(true)
  $('.c-news-list > .js-article-item').moji_equaliser()
  $('.js-common-resources li').moji_equaliser()
  $('.l-page-top > section').moji_equaliser()
  // This script is attached to a template and not a component
  $('.js-tabbed-content-container').moji_tabbedContent()
  $('.js-polls').moji_polls()
})
