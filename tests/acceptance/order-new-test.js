import { module, test } from 'qunit';
import { currentURL, visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { splitByNewline } from './../util';

const CUSTOMER_TAKEAWAY_DROPDOWN = '.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(1)';
const CUSTOMER_DELIVERY_DROPDOWN = '.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(2)';
const CUSTOMER_ONLINE_DROPDOWN = '.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(3)';

module('Acceptance | order/new', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
    this.server.loadFixtures();
  });

  async function selectCustomer(customerDropdownSelector) {
    await click('.order-pad_right_customer .dropdown > button');
    await click(customerDropdownSelector);
  }

  test('categories, menu, customer-select', async function(assert) {
    await visit('/order/new');

    assert.strictEqual(this.element.querySelectorAll('.category-button').length, 18, 'correct number of categories');
    assert.strictEqual(this.element.querySelectorAll('.order-pad_left_bottom_menu .list-group-item').length, 354, 'correct number of menu items');
    assert.ok(this.element.querySelector('.order-pad_right_customer').textContent.trim().startsWith('New customer'), 'customer select component with no customer displayed');
  });

  test('adding take-away customer', async function(assert) {
    await visit('/order/new');
    await selectCustomer(CUSTOMER_TAKEAWAY_DROPDOWN);

    assert.ok(this.element.querySelectorAll('.order-pad_right_customer input[placeholder="Telephone"]'));
    assert.ok(this.element.querySelectorAll('.order-pad_right_customer input[placeholder="Name"]'));
  });

  test('adding existing delivery customer', async function(assert) {
    await visit('/order/new');
    await selectCustomer(CUSTOMER_DELIVERY_DROPDOWN);

    await fillIn('.delivery-select input', '020');
    await click('.delivery-select .list-group-item', '020');

    let text = splitByNewline(this.element.querySelector('.order-pad_right_customer').textContent);
    assert.strictEqual(text[0], '02011111111');
    assert.strictEqual(text[1], '1 ONE ROAD');
    assert.strictEqual(text[2], 'AB1 2CD');
  });

  test('adding online customer', async function(assert) {
    await visit('/order/new');
    await selectCustomer(CUSTOMER_ONLINE_DROPDOWN);

    assert.ok(this.element.querySelectorAll('.order-pad_right_customer input[placeholder="Order id"]'));
  });

  test('saving new delivery customer', async function(assert) {
    await visit('/order/new');
    await selectCustomer(CUSTOMER_DELIVERY_DROPDOWN);
    await fillIn('input[placeholder="Telephone"]', '02011223344');
    await fillIn('input[placeholder="House no."]', '1');
    await fillIn('input[placeholder="Road"]', 'road one');
    await fillIn('input[placeholder="Postcode"]', 'postcode');
    await click('.delivery-select .btn-primary');

    let text = splitByNewline(this.element.querySelector('.order-pad_right_customer').textContent);
    assert.strictEqual(text[0], '02011223344');
    assert.strictEqual(text[1], '1 road one');
    assert.strictEqual(text[2], 'postcode');
  });

  test('saving new delivery customer fails', async function(assert) {
    this.server.post('/customer/deliveries', () => ({
      errors: [{ detail: 'Error message for customer delivery save failure' }]
    }), 500);

    await visit('/order/new');
    await selectCustomer(CUSTOMER_DELIVERY_DROPDOWN);
    await fillIn('input[placeholder="Telephone"]', '02011223344');
    await fillIn('input[placeholder="House no."]', '1');
    await fillIn('input[placeholder="Road"]', 'road one');
    await fillIn('input[placeholder="Postcode"]', 'postcode');
    await click('.delivery-select .btn-primary');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to save customer :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error message for customer delivery save failure'));
  });

  test('adding menu item to order', async function(assert) {
    await visit('/order/new');
    await click('.order-pad_left_bottom_menu .list-group-item');

    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 1);
  });

  test('adding edit option to order item', async function(assert) {
    await visit('/order/new');
    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_items .list-group-item');                     // click order item to show edit button
    await click('.order-pad_right_items .list-group-item button:nth-child(2)'); // click edit button
    await click('.modal-body .container-fluid.d-none.d-lg-block .btn-group-vertical button:nth-child(2)'); // click edit option
    await click('.modal-footer button');                                        // close modal
    await click('.order-pad_right_items .list-group-item');                     // hide order item edit buttons

    let text = splitByNewline(this.element.querySelector('.order-pad_right_items .list-group-item').textContent);
    assert.strictEqual(text.length, 3);
    assert.strictEqual(text[2], 'ADD CHICKEN (1.50)');
  });

  test('pressing back routes to index', async function(assert) {
    await visit('/order/new');
    await click('.order-pad_right_actions button.btn-main-secondary');
    assert.strictEqual(currentURL(), '/');
  });

  test('cancel order shows confirm dialog', async function(assert) {
    await visit('/order/new');
    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_actions .btn-danger');

    assert.ok(this.element.querySelector('.modal'));
  });

  test('confirming cancel dialog resets category, numpad value, customer, and order items', async function(assert) {
    await visit('/order/new');
    await click('.category-button');
    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_left_bottom_numpad button');
    await selectCustomer(CUSTOMER_TAKEAWAY_DROPDOWN);

    assert.ok(this.element.querySelector('.category-button.btn-main'));
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 1);
    assert.strictEqual(this.element.querySelector('[test-id="numpad-value"]').textContent.trim(), '1');
    assert.ok(this.element.querySelector('.order-pad_right_customer input'));

    await click('.order-pad_right_actions .btn-danger');
    await click('.modal-footer .btn-primary');

    assert.notOk(this.element.querySelector('.category-button.btn-main'));
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 0);
    assert.strictEqual(this.element.querySelector('[test-id="numpad-value"]').textContent.trim(), '');
    assert.notOk(this.element.querySelector('.order-pad_right_customer input'));
  });

  test('confirming order resets the order pad', async function(assert) {
    await visit('/order/new');
    await click('.order-pad_left_bottom_menu .list-group-item');
    await selectCustomer(CUSTOMER_TAKEAWAY_DROPDOWN);
    await click('.order-pad_right_actions .btn-success');
    await click('.modal .btn-success');
    await click('.app-overlay');

    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 0);
    assert.notOk(this.element.querySelector('.order-pad_right_customer input'));
  });

  test('submitting order error shows overlay', async function(assert) {
    this.server.post('/order/eat-outs', () => ({
      errors: [{ detail: 'Error message for POST order/eatOuts' }]
    }), 500);

    await visit('/order/new');
    await click('.order-pad_left_bottom_menu .list-group-item');
    await selectCustomer(CUSTOMER_TAKEAWAY_DROPDOWN);
    await click('.order-pad_right_actions .btn-success');
    await click('.modal .btn-success');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to submit order :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error message for POST order/eatOuts'));

    await click('.app-overlay');

    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 1);
    assert.ok(this.element.querySelector('.order-pad_right_customer input'));
  });

  test('modal displayed after dismissing overlay from submit error and resubmitting', async function(assert) {
    this.server.post('/order/eat-outs', () => ({
      errors: [{ detail: 'Error message for POST order/eatOuts' }]
    }), 500);

    await visit('/order/new');
    await click('.order-pad_left_bottom_menu .list-group-item');
    await selectCustomer(CUSTOMER_TAKEAWAY_DROPDOWN);
    await click('.order-pad_right_actions .btn-success');
    await click('.modal .btn-success');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to submit order :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error message for POST order/eatOuts'));

    await click('.app-overlay');

    await click('.order-pad_right_actions .btn-success');
    assert.ok(this.element.querySelector('.modal'));
  });

  test('unloads order items from the store to prevent duplicate order items after submitting and navigating to /orders/eat-out', async function(assert) {
    await visit('/order/new');
    await click('.order-pad_left_bottom_menu .list-group-item');
    await selectCustomer(CUSTOMER_TAKEAWAY_DROPDOWN);
    await click('.order-pad_right_actions .btn-success');
    await click('.modal .btn-success');
    await click('.app-overlay');
    await visit('/orders/eat-out');
    await click('.card [test-id="order-list-details-btn"]');

    assert.strictEqual(this.element.querySelectorAll('.card .list-group-item').length, 1);
  });

  // TODO narrow screen tests
  // test('customer select shown on narrow screen');
  // test('item count and order total displayed on show and hide order buttons');
  // test('pressing view order button on narrow screen shows order');
  // test('pressing hide order button on narrow screen shows menu');
  // test('when device is rotated, order is hidden to show menu');
});
