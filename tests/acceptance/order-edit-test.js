import { test } from 'qunit';
import moduleForAcceptance from 'epos-webapp/tests/helpers/module-for-acceptance';
import ToastController from 'epos-webapp/controllers/toast';

ToastController.reopen({
  DEBOUNCE_MS: 0
});

moduleForAcceptance('Acceptance | order/edit');

const MENU_ITEMS = '.order-edit_left_bottom_menu .list-group-item';
const CATEGORY_BUTTONS = '.order-edit_left_categories button';
const ORDER_ITEMS = '.order-edit_right_order_items .order-item';
const ORDER_INFO = '.order-edit_right_order_info';

test('Displays correct number of categories and menu items', function(assert) {
  assert.expect(2);

  visit('/order/edit');
  andThen(function() {
    assert.equal(find(MENU_ITEMS).length, 307);
    assert.equal(find(CATEGORY_BUTTONS).length, 18);
  });
});

test('Selecting a category filters the menu', function(assert) {
  assert.expect(1);

  visit('/order/edit');
  click(CATEGORY_BUTTONS + ':first');
  andThen(function() {
    assert.equal(find(MENU_ITEMS).length, 25);
  });
});

test('Adding an item', function(assert) {
  assert.expect(3);

  visit('/order/edit');
  click(MENU_ITEMS + ':first-child');
  andThen(function() {
    assert.equal(find(ORDER_ITEMS).length, 1);
    assert.ok(find(ORDER_INFO).text().includes('1 item'));
    assert.ok(find(ORDER_INFO).text().includes('£38.00'));
  });
});

//test('Removing an item', function(assert) {
//  assert.expect(2);
//
//  visit('/order/edit');
//  click(MENU_ITEMS + ':first-child');
//  click(ORDER_ITEMS + ':first-child');
//  click(ORDER_ITEMS + ':first-child .btn.btn-outline-danger');
//  andThen(function() {
//    assert.equal(find(ORDER_ITEMS).length, 0);
//    assert.ok(find(ORDER_INFO).text().includes(''));
//  });
//});

//test('Adding two order items increments to 2', function(assert) {
//  assert.expect(3);
//
//  visit('/order/edit');
//  click(MENU_ITEMS + ':first-child');
//  click(MENU_ITEMS + ':first-child');
//  andThen(function() {
//    assert.ok(find(ORDER_ITEMS + ':first-child').text().includes('2 x'));
//    assert.ok(find(ORDER_INFO).text().includes('2 items'));
//    assert.ok(find(ORDER_INFO).text().includes('£76.00'));
//  });
//});

//test('Decrementing an order item with quantity of 2 decrements to 1', function(assert) {
//  assert.expect(3);
//
//  visit('/order/edit/create');
//  click(MENU_ITEMS + ':first-child');
//  click(MENU_ITEMS + ':first-child');
//  click(ORDER_ITEMS + ' .order-item__top');
//  click(ORDER_ITEMS + ' .order-item__decrement');
//  andThen(() => {
//    assert.ok(find(ORDER_ITEMS + ':first-child').text().includes('1 x'));
//    assert.ok(find(ORDER_DETAILS).text().includes('ITEMS: 1'));
//    assert.ok(find(ORDER_MODAL_DETAILS).text().includes('ITEMS: 1'));
//  });
//});
//
//test('Numpad filtering', function(assert) {
//  assert.expect(2);
//
//  visit('/order/edit/create');
//  click('.order-edit__numpad .keypad-container .row:nth-child(1) div:nth-child(1) button');
//  click('.order-edit__numpad .keypad-container .row:nth-child(1) div:nth-child(2) button');
//  andThen(() => {
//    assert.equal(find(MENU_ITEMS).length, 1);
//    assert.ok(find('.order-edit__numpad-value').text().trim().startsWith('12'));
//  });
//});
//
////test('Editing an item displays edit options', function(assert) {
////  assert.expect(2);
////
////  visit('/order/edit/create');
////  click(MENU_ITEMS + ':first-child');
////  click(ORDER_ITEMS + ' .order-item__top');
////  click(ORDER_ITEMS + ' .order-item__edit-btn');
////  andThen(() => {
////    assert.equal($('#edit-item-modal .active a').text(), "Add Food");
////    assert.equal($('#edit-item-modal .modal-body ul li').length, 5);
////
////    //TODO: Submit and verify changes
////    //TODO: Close modal
////  });
////});
//
////test('Cancel order is disabled with no customer and no order items');
////test('Cancel order is enabled with customer');
////test('Cancel order is enabled with order items');
////
////test('Submit order order is disabled with no customer');
////test('Submit order order is disabled with no order items');
////test('Submit order order is enabled with customer and order items');
////
////test('Submitting the order displays confirm submit screen');
//
//test('Customer browser is visible', function(assert) {
//  assert.expect(1);
//
//  visit('/order/edit/create');
//  click(SELECT_CUSTOMER);
//  click(DELIVERY_CUSTOMER_DROPDOWN);
//  andThen(() => assert.equal(find('.customer-browser:visible').length, 1));
//});
//
//test('Tapping empty address does not show the dropdown', function(assert) {
//  assert.expect(1);
//
//  visit('/order/edit/create');
//  click(SELECT_CUSTOMER);
//  click(DELIVERY_CUSTOMER_DROPDOWN);
//  click('input[placeholder=Road]');
//  andThen(() => assert.equal(find('input[placeholder=Address] + ul li a:visible').length, 0));
//});
//
//test('Tapping empty postcode does not show the dropdown', function(assert) {
//  assert.expect(1);
//
//  visit('/order/edit/create');
//  click(SELECT_CUSTOMER);
//  click(DELIVERY_CUSTOMER_DROPDOWN);
//  click('input[placeholder=Postcode]');
//  andThen(() => assert.equal(find('input[placeholder=Postcode] + ul li a:visible').length, 0));
//});
//
//test('Searching customer address shows a dropdown', function(assert) {
//  assert.expect(1);
//
//  visit('/order/edit/create');
//  click(SELECT_CUSTOMER);
//  click(DELIVERY_CUSTOMER_DROPDOWN);
//  fillIn('input[placeholder=Road]', 'AA');
//  andThen(() => assert.equal(find('input[placeholder=Road] + ul li a:visible').length, 4));
//});
//
//test('Searching customer postcode shows a dropdown', function(assert) {
//  assert.expect(1);
//
//  visit('/order/edit/create');
//  click(SELECT_CUSTOMER);
//  click(DELIVERY_CUSTOMER_DROPDOWN);
//  fillIn('input[placeholder=Postcode]', 'AA');
//  andThen(() => assert.equal(find('input[placeholder=Postcode] + ul li a:visible').length, 4));
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

