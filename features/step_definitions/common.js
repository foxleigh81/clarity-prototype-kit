// This file gives definitions that the feature files can use
require('dotenv').config();
var chalk = require('chalk');
var {defineSupportCode} = require('cucumber');
var seleniumWebdriver = require('selenium-webdriver'),
    By = seleniumWebdriver.By,
    until = seleniumWebdriver.until;

defineSupportCode(function({ Given, When, Then }) {

  Given(/^I show my environment$/, function (next) {
    console.log(chalk.green("Running against:" + process.env.TARGET_URI))
    next()
  })

  When(/^I visit "(.*?)"$/, function (url) {
    return this.driver.get(url);
  })

  Then(/^I should be on "([^"]*)"$/, function(page_name) {
    this.driver.get(process.env.TARGET_URI+'/'+page_name)
    .then(function() {
      return this.driver.getCurrentUrl();
    })
  })

  // Then(/^I should see "(.*?)"$/, function(text) {
  //   expect(page).to have_text(text)
  // })

  Then(/^I should see "([^"]*)"$/, function (text) {
    var xpath = "//*[contains(text(),'" + text + "')]";
    var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
    return this.driver.wait(condition, 5000);
  });

  // #Make sure the page matches a regex
  // Then(/^The content should contain "([^"]*)"$/) do |regex|
  //   expect(page.text).to match(Regexp.new(regex))
  // end

  // Then(/^I should not see "(.*?)"$/) do |text|
  //   expect(page).not_to have_text(text)
  // end

  // Then(/^I should see an image called "(.*?)"$/) do |path|
  //   expect(page).to have_css("img[src*='#{path}']")
  // end

  // Then(/^I should see a link which says "(.*?)" and goes to "(.*?)"$/) do |text, url|
  //   expect(find_link(text)[:href]).to match(url)
  // end

  Then(/^I expect to see a "([^"]*)" element$/, function(element) {
    this.driver.findElement(By.css(element))
  })

  // Then(/^I should see the page title "([^"]*)"$/) do |text|
  //   expect(page).to have_selector('h1.page-title', text: text)
  // end

  // Then(/^I should not see a "([^"]*)" element$/) do |element|
  //   expect(page).to have_no_selector(element, visible: false)
  // end

  // Then(/^If "([^"]*)" exists, I should see the "([^"]*)" elements?$/) do |haystack, needle|
  //   page.all(haystack).each do |hs|
  //     expect(hs.find(needle)).not_to be_blank
  //   end
  // end

  // Then(/^I expect the "([^"]*)" elements? to be hidden$/) do |element|
  //   expect(page).not_to have_css(element, visible: :hidden)
  // end

  // When(/^I click the "(.*?)" element$/) do |element|
  //   page.find(element).click
  // end

  // When(/^I click the "(.*?)" link$/) do |text|
  //   find("a", :text => "#{text}").click
  // end

  // When(/^I click the "(.*?)" button$/) do |text|
  //   begin
  //     find("input[value='#{text}']").click
  //   rescue Capybara::Poltergeist::MouseEventFailed
  //     find("input[value='#{text}']").trigger('click')
  //   end
  // end

  // When(/^I click the hidden "(.*?)" element$/) do |element|
  //   find(element, visible: false).trigger(:click)
  // end

  // When(/^I click the hidden "(.*?)" element and accept the confirmation$/) do |element|
  //   accept_confirm { step %[I click the hidden "#{element}" element] }
  // end

  // When(/^I hover over the "(.*?)" element$/) do |element|
  //   find(element).hover
  // end

  // Given(/^I fill in my email address$/) do
  //   @email ||= "#{SecureRandom.uuid}@test.com"
  //   puts @email
  //   step %[I fill in "Your email address" with "#{@email}"]
  // end

  // When(/^I pause for "([^"]*)" seconds?$/) do |seconds|
  //   sleep seconds.to_i
  // end

  // And(/^The current URL path is "([^"]*)"$/) do |path|
  //   expect(page).to have_current_path(path, only_path: true)
  // end
})