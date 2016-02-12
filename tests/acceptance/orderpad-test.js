import { test } from 'qunit';
import moduleForAcceptance from 'talaythai-webapp/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | orderpad');

// ### CSS CONSTANTS ###
const menuItems = '#orderpad-menu .list-group-item';
const categoryButtons = '#orderpad-categories button';
const orderItemsInOrderpad = '#orderpad-orderlist .list-group-item';
const deliveryCustomerSelectionButton = '#orderpad-customer .dropdown > ul > li:nth-child(3) > a';
// ### END CONSTANTS ###

test('Displays correct number of categories and menu items', function(assert) {
  assert.expect(2);

  visit('/orderpad').then(() => {
    assert.equal(find(menuItems).length, 162);
    assert.equal(find(categoryButtons).length, 17);
  });
});

test('Selecting a category', function(assert) {
  assert.expect(1);

  visit('/orderpad');
  click(categoryButtons + ':first');
  andThen(() => assert.equal(find(menuItems).length, 18));
});

test('Adding an item', function(assert) {
  assert.expect(3);

  visit('/orderpad');
  click(menuItems + ':first-child');
  andThen(() => {
    assert.equal(find(orderItemsInOrderpad).length, 1);
    assert.ok(find('#orderpad-bottom').text().includes('ITEMS: 1'));
    assert.ok(find('#orderpad-bottom').text().includes('TOTAL: 2.95'));
  });

});

test('Adding an item [Modal]', function(assert) {
  assert.expect(3);

  visit('/orderpad');
  click(menuItems + ':first-child');
  andThen(() => {
    assert.equal(find(orderItemsInOrderpad).length, 1);
    assert.ok(find('#orderpad-modal .modal-footer').text().includes('ITEMS: 1'));
    assert.ok(find('#orderpad-modal .modal-footer').text().includes('TOTAL: 2.95'));
  });

});

test('Removing an item', function(assert) {
  assert.expect(3);

  visit('/orderpad');
  click(menuItems + ':first-child');
  click('#orderpad-orderlist .decrement-btn');
  andThen(() => {
    assert.equal(find(orderItemsInOrderpad).length, 0);
    assert.ok(find('#orderpad-bottom').text().includes('ITEMS: 0'));
    assert.ok(find('#orderpad-bottom').text().includes('TOTAL: 0.00'));
  });

});

test('Removing an item [Modal] ', function(assert) {
  assert.expect(3);

  visit('/orderpad');
  click(menuItems + ':first-child');
  click('#orderpad-modal .decrement-btn:first');
  andThen(() => {
    assert.equal(find(orderItemsInOrderpad).length, 0);
    assert.ok(find('#orderpad-modal .modal-footer').text().includes('ITEMS: 0'));
    assert.ok(find('#orderpad-modal .modal-footer').text().includes('TOTAL: 0.00'));
  });

});

test('Adding two order items increments to 2', function(assert) {
  assert.expect(3);

  visit('/orderpad');
  click(menuItems + ':first-child');
  click(menuItems + ':first-child');
  andThen(() => {
    assert.ok(find('#orderpad-orderlist .list-group-item:first-child').text().includes('2'));
    assert.ok(find('#orderpad-bottom').text().includes('ITEMS: 2'));
    assert.ok(find('#orderpad-bottom').text().includes('TOTAL: 5.90'));
  });

});

test('Deleting an order item with quantity of 2 decrements to 1', function(assert) {
  assert.expect(3);

  visit('/orderpad');
  click(menuItems + ':first-child');
  click(menuItems + ':first-child');
  click('#orderpad-orderlist .decrement-btn');
  andThen(() => {
    assert.ok(find('#orderpad-orderlist .list-group-item:first-child').text().includes('1'));
    assert.ok(find('#orderpad-bottom').text().includes('ITEMS: 1'));
    assert.ok(find('#orderpad-bottom').text().includes('TOTAL: 2.95'));
  });

});

test('Numpad filtering', function(assert) {
  assert.expect(2);

  visit('/orderpad');
  click('#orderpad-numpad .keypad-container .row:nth-child(1) div:nth-child(1) button');
  click('#orderpad-numpad .keypad-container .row:nth-child(1) div:nth-child(2) button');
  andThen(() => {
    assert.equal(find(menuItems).length, 1);
    assert.ok(find('#orderpad-numpad').text().trim().startsWith('12'));
  });

});

test('Customer browser is visible', function(assert) {
  assert.expect(1);

  visit('/orderpad');
  click('#orderpad-customer button');
  click(deliveryCustomerSelectionButton);
  andThen(() => assert.equal(find('.customer-browser:visible').length, 1));
});

test('Tapping empty address does not show the dropdown', function(assert) {
  assert.expect(1);

  visit('/orderpad');
  click('#orderpad-customer button');
  click(deliveryCustomerSelectionButton);
  click('input[placeholder=Road]');
  andThen(() => assert.equal(find('input[placeholder=Address] + ul li a:visible').length, 0));
});

test('Tapping empty postcode does not show the dropdown', function(assert) {
  assert.expect(1);

  visit('/orderpad');
  click('#orderpad-customer button');
  click(deliveryCustomerSelectionButton);
  click('input[placeholder=Postcode]');
  andThen(() => assert.equal(find('input[placeholder=Postcode] + ul li a:visible').length, 0));
});

test('Searching customer address shows a dropdown', function(assert) {
  assert.expect(1);

  visit('/orderpad');
  click('#orderpad-customer button');
  click(deliveryCustomerSelectionButton);
  fillIn('input[placeholder=Road]', 'AA');
  andThen(() => assert.equal(find('input[placeholder=Road] + ul li a:visible').length, 4));
});

test('Searching customer postcode shows a dropdown', function(assert) {
  assert.expect(1);

  visit('/orderpad');
  click('#orderpad-customer button');
  click(deliveryCustomerSelectionButton);
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

