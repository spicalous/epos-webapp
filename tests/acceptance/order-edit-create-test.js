import { test } from 'qunit';
import moduleForAcceptance from 'talaythai-webapp/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | order/edit/create');

// ### CSS CONSTANTS ###
const MENU_ITEMS = '.order-edit__menu .list-group-item';
const CATEGORY_BUTTONS = '.order-edit__categories button';
const ORDER_ITEMS = '.order-edit-create__order .list-group-item';
const ORDER_DETAILS = '.order-edit-create__details';
const ORDER_MODAL_DETAILS = '.order-edit-create__order-modal-details';
const SELECT_CUSTOMER = '.order-edit-create__customer';
const DELIVERY_CUSTOMER_DROPDOWN = SELECT_CUSTOMER + ' .dropdown > ul > li:nth-child(3) > a';
// ### END CONSTANTS ###

test('Displays correct number of categories and menu items', function(assert) {
  assert.expect(2);

  visit('/order/edit/create').then(() => {
    assert.equal(find(MENU_ITEMS).length, 162);
    assert.equal(find(CATEGORY_BUTTONS).length, 17);
  });
});

test('Selecting a category', function(assert) {
  assert.expect(1);

  visit('/order/edit/create');
  click(CATEGORY_BUTTONS + ':first');
  andThen(() => assert.equal(find(MENU_ITEMS).length, 18));
});

test('Adding an item', function(assert) {
  assert.expect(5);

  visit('/order/edit/create');
  click(MENU_ITEMS + ':first-child');
  andThen(() => {
    assert.equal(find(ORDER_ITEMS).length, 1);
    assert.ok(find(ORDER_DETAILS).text().includes('ITEMS: 1'));
    assert.ok(find(ORDER_DETAILS).text().includes('TOTAL: 2.95'));
    assert.ok(find(ORDER_MODAL_DETAILS).text().includes('ITEMS: 1'));
    assert.ok(find(ORDER_MODAL_DETAILS).text().includes('TOTAL: 2.95'));
  });
});

test('Removing an item', function(assert) {
  assert.expect(5);

  visit('/order/edit/create');
  click(MENU_ITEMS + ':first-child');
  click(ORDER_ITEMS + ' .decrement-btn');
  andThen(() => {
    assert.equal(find(ORDER_ITEMS).length, 0);
    assert.ok(find(ORDER_DETAILS).text().includes('ITEMS: 0'));
    assert.ok(find(ORDER_DETAILS).text().includes('TOTAL: 0.00'));
    assert.ok(find(ORDER_MODAL_DETAILS).text().includes('ITEMS: 0'));
    assert.ok(find(ORDER_MODAL_DETAILS).text().includes('TOTAL: 0.00'));
  });
});

test('Adding two order items increments to 2', function(assert) {
  assert.expect(5);

  visit('/order/edit/create');
  click(MENU_ITEMS + ':first-child');
  click(MENU_ITEMS + ':first-child');
  andThen(() => {
    assert.ok(find(ORDER_ITEMS + ':first-child').text().includes('2'));
    assert.ok(find(ORDER_DETAILS).text().includes('ITEMS: 2'));
    assert.ok(find(ORDER_DETAILS).text().includes('TOTAL: 5.90'));
    assert.ok(find(ORDER_MODAL_DETAILS).text().includes('ITEMS: 2'));
    assert.ok(find(ORDER_MODAL_DETAILS).text().includes('TOTAL: 5.90'));
  });
});

test('Deleting an order item with quantity of 2 decrements to 1', function(assert) {
  assert.expect(5);

  visit('/order/edit/create');
  click(MENU_ITEMS + ':first-child');
  click(MENU_ITEMS + ':first-child');
  click(ORDER_ITEMS + ' .decrement-btn');
  andThen(() => {
    assert.ok(find(ORDER_ITEMS + ':first-child').text().includes('1'));
    assert.ok(find(ORDER_DETAILS).text().includes('ITEMS: 1'));
    assert.ok(find(ORDER_DETAILS).text().includes('TOTAL: 2.95'));
    assert.ok(find(ORDER_MODAL_DETAILS).text().includes('ITEMS: 1'));
    assert.ok(find(ORDER_MODAL_DETAILS).text().includes('TOTAL: 2.95'));
  });
});

test('Numpad filtering', function(assert) {
  assert.expect(2);

  visit('/order/edit/create');
  click('.order-edit__numpad .keypad-container .row:nth-child(1) div:nth-child(1) button');
  click('.order-edit__numpad .keypad-container .row:nth-child(1) div:nth-child(2) button');
  andThen(() => {
    assert.equal(find(MENU_ITEMS).length, 1);
    assert.ok(find('.order-edit__numpad-value').text().trim().startsWith('12'));
  });
});

test('Editing an item displays edit options', function(assert) {
  assert.expect(2);

  visit('/order/edit/create');
  click(MENU_ITEMS + ':first-child');
  click('.edit-item-btn');
  andThen(() => {
    assert.equal($('#edit-item-modal .active a').text(), "Add Food");
    assert.equal($('#edit-item-modal .modal-body ul li').length, 5);

    //TODO: After hook
    click('.edit-item-btn');
  });
});

//test('Cancel order is disabled with no customer and no order items');
//test('Cancel order is enabled with customer');
//test('Cancel order is enabled with order items');
//
//test('Submit order order is disabled with no customer');
//test('Submit order order is disabled with no order items');
//test('Submit order order is enabled with customer and order items');
//
//test('Submitting the order displays confirm submit screen');

test('Customer browser is visible', function(assert) {
  assert.expect(1);

  visit('/order/edit/create');
  click(SELECT_CUSTOMER);
  click(DELIVERY_CUSTOMER_DROPDOWN);
  andThen(() => assert.equal(find('.customer-browser:visible').length, 1));
});

test('Tapping empty address does not show the dropdown', function(assert) {
  assert.expect(1);

  visit('/order/edit/create');
  click(SELECT_CUSTOMER);
  click(DELIVERY_CUSTOMER_DROPDOWN);
  click('input[placeholder=Road]');
  andThen(() => assert.equal(find('input[placeholder=Address] + ul li a:visible').length, 0));
});

test('Tapping empty postcode does not show the dropdown', function(assert) {
  assert.expect(1);

  visit('/order/edit/create');
  click(SELECT_CUSTOMER);
  click(DELIVERY_CUSTOMER_DROPDOWN);
  click('input[placeholder=Postcode]');
  andThen(() => assert.equal(find('input[placeholder=Postcode] + ul li a:visible').length, 0));
});

test('Searching customer address shows a dropdown', function(assert) {
  assert.expect(1);

  visit('/order/edit/create');
  click(SELECT_CUSTOMER);
  click(DELIVERY_CUSTOMER_DROPDOWN);
  fillIn('input[placeholder=Road]', 'AA');
  andThen(() => assert.equal(find('input[placeholder=Road] + ul li a:visible').length, 4));
});

test('Searching customer postcode shows a dropdown', function(assert) {
  assert.expect(1);

  visit('/order/edit/create');
  click(SELECT_CUSTOMER);
  click(DELIVERY_CUSTOMER_DROPDOWN);
  fillIn('input[placeholder=Postcode]', 'AA');
  andThen(() => assert.equal(find('input[placeholder=Postcode] + ul li a:visible').length, 4));
});


//test('Canceling an order hides the modal', function(assert) {

//  assert.expect(3);
//  visit('/orderpad');

//  andThen(function() {

//  });

//});

//TODO edit item tests
//TODO overlay tests
//TODO toast tests - and timeout bug with overlay

