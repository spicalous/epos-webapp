import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'talaythai-webapp/tests/helpers/start-app';

var application;

module('Acceptance | orderpad', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("Page contents", function(assert) {

  assert.expect(2);
  visit('/orderpad').then(function() {
    assert.equal(find('.orderpad-menu .list-group-item').length, 35, "Correct number of menu items");
    assert.equal(find('.orderpad-categories .row button').length, 18, "Correct number of category items");
  });

});

test("Adding an item in the main view", function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('.orderpad-menu .list-group-item:first-child');

  andThen(function() {
    assert.equal(find('#orderpad-order .orderpad-order .list-group-item').length, 1, "Correctly added menu item to main order item list");
    assert.ok(find('#orderpad-order .orderpad-summary').text().includes('ITEMS: 1'), "Correctly updates the item count text");
    assert.ok(find('#orderpad-order .orderpad-summary').text().includes('TOTAL: 2.95'), "Correctly updates the total text");
  });

});

test("Adding an item in the modal", function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('.orderpad-menu .list-group-item:first-child');

  andThen(function() {

    assert.equal(find('#orderpad-modal .orderpad-order .list-group-item').length, 1, "Correctly added menu item to modal order item list");
    assert.ok(find('#orderpad-modal .orderpad-summary').text().includes('ITEMS: 1'), "Correctly updates the item count text");
    assert.ok(find('#orderpad-modal .orderpad-summary').text().includes('TOTAL: 2.95'), "Correctly updates the total text");
  });

});

test("Selecting a category", function(assert) {

  assert.expect(1);
  visit('/orderpad');
  click('.orderpad-categories button:first-child');

  andThen(function() {

    assert.equal(find('.orderpad-menu .list-group-item').length, 18, "Correct number of menu items after filtering");
  });

});

test("Deleting an order item with quantity of 1 removes it", function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('.orderpad-menu .list-group-item:first-child');
  click('#orderpad-order .orderpad-order .decrement-btn');

  andThen(function() {

    assert.equal(find('#orderpad-order .orderpad-order .list-group-item').length, 0, "Correctly removes menu item from main order item list");
    assert.ok(find('#orderpad-order .orderpad-summary').text().includes('ITEMS: 0'), "Correctly updates the item count text");
    assert.ok(find('#orderpad-order .orderpad-summary').text().includes('TOTAL: 0.00'), "Correctly updates the total text");
  });

});

test("Deleting an order item with quantity of 1 removes it", function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('.orderpad-menu .list-group-item:first-child');
  click('#orderpad-modal .orderpad-order .decrement-btn');

  andThen(function() {

    assert.equal(find('#orderpad-modal .orderpad-order .list-group-item').length, 0, "Correctly removes menu item from modal order item list");
    assert.ok(find('#orderpad-modal .orderpad-summary').text().includes('ITEMS: 0'), "Correctly updates the item count text");
    assert.ok(find('#orderpad-modal .orderpad-summary').text().includes('TOTAL: 0.00'), "Correctly updates the total text");
  });

});

test("Deleting an order item with quantity of 2 decrements to 1", function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('.orderpad-menu .list-group-item:first-child');
  click('.orderpad-menu .list-group-item:first-child');
  click('#orderpad-order .orderpad-order .decrement-btn');

  andThen(function() {

    assert.equal(find('#orderpad-order .orderpad-order .list-group-item').length, 1, "Correctly removes menu item from main order item list");
    assert.ok(find('#orderpad-order .orderpad-summary').text().includes('ITEMS: 1'), "Correctly updates the item count text");
    assert.ok(find('#orderpad-order .orderpad-summary').text().includes('TOTAL: 2.95'), "Correctly updates the total text");
  });

});

