Feature: Test the global header works as expected

Scenario: Header components should exist
    Given I visit "/hello"
    Then I expect to see a ".c-logo-bar" element
    And I expect to see a ".c-search-bar" element
    And I expect to see a ".c-main-nav-bar" element

