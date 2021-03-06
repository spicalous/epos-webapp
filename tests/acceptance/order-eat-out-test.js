import { module, test } from 'qunit';
import { click, currentURL, fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { splitByNewline } from 'epos-webapp/tests/util';

module('Acceptance | order/eat-out', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
    this.server.loadFixtures();
  });

  function assertOrderInfo(assert, element, expectedQuantityText, expectedTotalText) {
    assert.strictEqual(element.querySelector('.order-pad_right_info div').textContent.trim(), expectedQuantityText);
    assert.strictEqual(element.querySelector('.order-pad_right_info div:nth-child(2)').textContent.trim(), expectedTotalText);
  }

  test('editing orders/eat-out item', async function(assert) {
    await visit('/orders/eat-out');

    await click('[test-id="order-card-edit"]');

    assert.strictEqual(currentURL(), '/order/eat-out/9');
    assert.ok(this.element.querySelector('.order-pad'));
    assert.notOk(this.element.querySelector('.icon-delete-white'));
  });

  test('order with take-away customer', async function(assert) {
    await visit('/order/eat-out/1');

    assert.ok(this.element.querySelectorAll('.order-pad_right_customer [placeholder="Telephone"]'), 'telephone input displayed');
    assert.ok(this.element.querySelectorAll('.order-pad_right_customer [placeholder="Name"]'), 'name input displayed');
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_customer input:disabled').length, 2);
    assert.notOk(this.element.querySelector('.icon-delete-white'));
  });

  test('order with delivery customer', async function(assert) {
    await visit('/order/eat-out/4');

    let text = splitByNewline(this.element.querySelector('.order-pad_right_customer').textContent);
    assert.strictEqual(text[0], '02011111111');
    assert.strictEqual(text[1], '1 ONE ROAD');
    assert.strictEqual(text[2], 'AB1 2CD');
    assert.notOk(this.element.querySelector('.icon-delete-white'));
  });

  test('order with online customer', async function(assert) {
    await visit('/order/eat-out/7');

    assert.ok(this.element.querySelectorAll('.order-pad_right_customer input[placeholder="Order id"]'), 'order id input displayed');
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_customer input:disabled').length, 1);
    assert.notOk(this.element.querySelector('.icon-delete-white'));
  });

  test('estimated time select is displayed with eat out order', async function(assert) {
    await visit('/order/eat-out/1');
    await click('.order-pad_right_actions .btn-success');

    assert.strictEqual(this.element.querySelectorAll('.modal select').length, 2);
  });

  test('confirming cancel dialog does not save changes and transitions back to orders route', async function(assert) {
    await visit('/orders/eat-out');
    await click('.card [test-id="order-list-details-btn"]');

    // assert initial state
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'ONLINE £14.95');
    assert.strictEqual(this.element.querySelectorAll('.card .list-group-item').length, 2);

    // edit
    await click('.card .row button');
    // initial state
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 2);
    assertOrderInfo(assert, this.element, '5 items', '£14.95');

    // add menu item
    await click('.order-pad_left_bottom_menu .list-group-item');
    assertOrderInfo(assert, this.element, '6 items', '£56.95');
    // add edit option
    await click('.order-pad_right_items .list-group-item:nth-child(3)');
    await click('.order-pad_right_items .list-group-item:nth-child(3) button:nth-child(2)');
    await click('.modal-body .container-fluid.d-none.d-lg-block .btn-group-vertical button:nth-child(2)');
    await click('.modal-footer button');
    assertOrderInfo(assert, this.element, '6 items', '£57.70');

    await click('.order-pad_right_actions .btn-danger');
    await click('.modal-footer .btn-danger');

    await click('.card [test-id="order-list-details-btn"]');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'ONLINE £14.95');
    assert.strictEqual(this.element.querySelectorAll('.card .list-group-item').length, 2);
  });

  test('confirming order transitions to and reflects updates on /orders/eat-out ', async function(assert) {
    await visit('/orders/eat-out');
    await click('.card [test-id="order-list-details-btn"]');

    // assert initial state
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'ONLINE £14.95');
    assert.strictEqual(this.element.querySelectorAll('.card .list-group-item').length, 2);

    // edit
    await click('[test-id="order-card-edit"]');
    // initial state
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 2);
    assertOrderInfo(assert, this.element, '5 items', '£14.95');

    // add menu item
    await click('.order-pad_left_bottom_menu .list-group-item');
    assertOrderInfo(assert, this.element, '6 items', '£56.95');
    // add edit option
    await click('.order-pad_right_items .list-group-item:nth-child(3)');
    await click('.order-pad_right_items .list-group-item:nth-child(3) button:nth-child(2)');
    await click('.modal-body .container-fluid.d-none.d-lg-block .btn-group-vertical button:nth-child(2)');
    await click('.modal-footer button');
    assertOrderInfo(assert, this.element, '6 items', '£57.70');

    await click('.order-pad_right_actions .btn-success');
    await click('.modal-footer .btn-success');
    await click('.app-overlay');

    await click('.card [test-id="order-list-details-btn"]');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'ONLINE £57.70');
    assert.strictEqual(this.element.querySelectorAll('.card .list-group-item').length, 3);
  });

  test('submitting order error shows overlay', async function(assert) {
    this.server.patch('/order/eat-outs/:id', () => ({
      errors: [{ detail: 'Error message for PATCH order/eatOuts' }]
    }), 500);

    await visit('/orders/eat-out');
    await click('[test-id="order-card-edit"]');
    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_actions .btn-success');
    await click('.modal .btn-success');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to submit order :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error message for PATCH order/eatOuts'));

    await click('.app-overlay');

    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 3);
    assert.ok(this.element.querySelector('.order-pad_right_customer input'));
  });

  test('allows adding order modifier on new order', async function(assert) {
    await visit('/');

    await click('.row:nth-child(4) button');
    await click('.order-pad_left_bottom_menu .list-group-item');
    assertOrderInfo(assert, this.element, '1 item', '£42.00');

    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(1)');
    await click('.btn-success');

    assert.strictEqual(this.element.querySelector('.modal-footer .row:nth-child(2) button').textContent.trim(), 'Apply discount');
    await click('.modal-footer .row:nth-child(2) button');
    await fillIn('.modal input', 50);
    await click('.modal-footer .btn-primary');
    assert.strictEqual(this.element.querySelector('.modal-footer .row:nth-child(2) button').textContent.trim(), 'Remove discount');

    let modalOrderInfo = this.element.querySelectorAll('.modal-footer .container-fluid > .row > div');
    assert.strictEqual(modalOrderInfo[0].textContent.trim(), 'Sub-total');
    assert.strictEqual(modalOrderInfo[1].textContent.trim(), '£42.00');
    assert.strictEqual(modalOrderInfo[2].textContent.trim(), 'Discount');
    assert.strictEqual(modalOrderInfo[3].textContent.trim(), '(50%) -£21.00');
    assert.strictEqual(modalOrderInfo[4].textContent.trim(), '1 item');
    assert.strictEqual(modalOrderInfo[5].textContent.trim(), '£21.00');

    await visit('/orders/eat-out');
    assert.strictEqual(this.element.querySelector('[test-id="order-modifier"] div:nth-child(1)').textContent.trim(), 'Sub-total: £42.00');
    assert.strictEqual(this.element.querySelector('[test-id="order-modifier"] div:nth-child(2)').textContent.trim(), 'Discount: (50%) -£21.00');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £21.00');
  });
});
