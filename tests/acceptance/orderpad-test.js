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

// ### CSS CONSTANTS ###

var VISIBLE_MENU_LIST = '#orderpad-menu .list-group-item',
    VISIBLE_CATEGORY_BUTTONS = '#orderpad-categories button',
    VISIBLE_ORDER_LIST = '#orderpad-orderlist .list-group-item';

test('Displays correct number of categories and menu items', function(assert) {

  assert.expect(2);
  visit('/orderpad').then(function() {
    assert.equal(find(VISIBLE_MENU_LIST).length, 162, 'Wrong number of menu items');
    assert.equal(find(VISIBLE_CATEGORY_BUTTONS).length, 17, 'Wrong number of category items');
  });

});

test('Selecting a category', function(assert) {

  assert.expect(1);
  visit('/orderpad');
  click('#orderpad-categories button:first');
  andThen(function() {
    assert.equal(find(VISIBLE_MENU_LIST).length, 18, 'Correct number of menu items after filtering');
  });

});

test('Adding an item', function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('#orderpad-menu .list-group-item:first-child');
  andThen(function() {
    assert.equal(find(VISIBLE_ORDER_LIST).length, 1, 'Correctly added menu item to main order item list');
    assert.ok(find('#orderpad-bottom').text().includes('ITEMS: 1'), 'Correctly updates the item count text');
    assert.ok(find('#orderpad-bottom').text().includes('TOTAL: 2.95'), 'Correctly updates the total text');
  });

});

test('Adding an item [Modal]', function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('#orderpad-menu .list-group-item:first-child');
  andThen(function() {
    assert.equal(find(VISIBLE_ORDER_LIST).length, 1, 'Correctly added menu item to modal order item list');
    assert.ok(find('#orderpad-modal .modal-footer').text().includes('ITEMS: 1'), 'Correctly updates the item count text');
    assert.ok(find('#orderpad-modal .modal-footer').text().includes('TOTAL: 2.95'), 'Correctly updates the total text');
  });

});

test('Removing an item', function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('#orderpad-menu .list-group-item:first-child');
  click('#orderpad-orderlist .decrement-btn');
  andThen(function() {
    assert.equal(find(VISIBLE_ORDER_LIST).length, 0, 'Correctly removes menu item from main order item list');
    assert.ok(find('#orderpad-bottom').text().includes('ITEMS: 0'), 'Correctly updates the item count text');
    assert.ok(find('#orderpad-bottom').text().includes('TOTAL: 0.00'), 'Correctly updates the total text');
  });

});

test('Removing an item [Modal] ', function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('#orderpad-menu .list-group-item:first');
  click('#orderpad-modal .decrement-btn:first');
  andThen(function() {
    assert.equal(find(VISIBLE_ORDER_LIST).length, 0, 'Correctly removes menu item from modal order item list');
    assert.ok(find('#orderpad-modal .modal-footer').text().includes('ITEMS: 0'), 'Correctly updates the item count text');
    assert.ok(find('#orderpad-modal .modal-footer').text().includes('TOTAL: 0.00'), 'Correctly updates the total text');
  });

});

test('Adding two order items increments to 2', function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('#orderpad-menu .list-group-item:first-child');
  click('#orderpad-menu .list-group-item:first-child');
  andThen(function() {
    assert.ok(find('#orderpad-orderlist .list-group-item:first-child').text().includes('2'), 'Correctly removes menu item from main order item list');
    assert.ok(find('#orderpad-bottom').text().includes('ITEMS: 2'), 'Correctly updates the item count text');
    assert.ok(find('#orderpad-bottom').text().includes('TOTAL: 5.90'), 'Correctly updates the total text');
  });

});

test('Deleting an order item with quantity of 2 decrements to 1', function(assert) {

  assert.expect(3);
  visit('/orderpad');
  click('#orderpad-menu .list-group-item:first-child');
  click('#orderpad-menu .list-group-item:first-child');
  click('#orderpad-orderlist .decrement-btn');
  andThen(function() {
    assert.ok(find('#orderpad-orderlist .list-group-item:first-child').text().includes('1'), 'Correctly removes menu item from main order item list');
    assert.ok(find('#orderpad-bottom').text().includes('ITEMS: 1'), 'Correctly updates the item count text');
    assert.ok(find('#orderpad-bottom').text().includes('TOTAL: 2.95'), 'Correctly updates the total text');
  });

});

test('Numpad filtering', function(assert) {

  assert.expect(2);

  visit('/orderpad');
  click('#orderpad-numpad .keypad-container .row:nth-child(1) div:nth-child(1) button');
  click('#orderpad-numpad .keypad-container .row:nth-child(1) div:nth-child(2) button');
  andThen(function() {
    assert.equal(find(VISIBLE_MENU_LIST).length, 1, 'Wrong number of filtered menu items');
    assert.ok(find('#orderpad-numpad').text().trim().startsWith('12'), 'Incorrect numberpad value displayed');
  });

});

//Enable in PROD
//test('Submitting an order transitions to index', function(assert) {
//
//  assert.expect(1);
//  visit('/orderpad');
//  click('#orderpad-order .submit-btn');
//
//  andThen(function() {
//    var current = currentRouteName(),
//        expected = 'index';
//    assert.equal(current, 'index', 'Expected: ' + expected + ', got: ' + current);
//  });
//
//});

//test('Canceling an order hides the modal', function(assert) {

//  assert.expect(3);
//  visit('/orderpad');

//  andThen(function() {

//  });

//});

//TODO edit item tests
//TODO overlay tests
//TODO toast tests - and timeout bug with overlay

