import { module, test } from 'qunit';
import { click, currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { splitByNewline } from 'epos-webapp/tests/util';

module('Acceptance | order/eat-in', function(hooks) {
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

  test('editing orders/eat-in item', async function(assert) {
    await visit('/orders/eat-in');

    await click('[test-id="order-card-edit"]');

    assert.strictEqual(currentURL(), '/order/eat-in/3');
    assert.ok(this.element.querySelector('.order-pad'));
  });

  test('displays table info', async function(assert) {
    await visit('/order/eat-in/1');

    let text = splitByNewline(this.element.querySelector('.order-pad_right_customer .col > div').textContent);
    assert.strictEqual(text.length, 3);
    assert.strictEqual(text[0], 'Table 1');
    assert.strictEqual(text[1], '2');
    assert.strictEqual(text[2], 'ID: AAA111');
  });

  test('does not show back button when no order items', async function(assert) {
    await visit('/order/eat-in/1');
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 0);
    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-danger').textContent.trim(), 'Cancel', 'Cancel button displayed');
    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-secondary:disabled').textContent.trim(), 'Submit', 'Submit button displayed');
  });

  test('estimated time select is not displayed with eat in order', async function(assert) {
    await visit('/order/eat-in/1');
    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_actions .btn-success');

    assert.strictEqual(this.element.querySelectorAll('.modal select').length, 1);
  });

  test('confirming cancel dialog does not save changes and transitions back to orders route', async function(assert) {
    await visit('/orders/eat-in');
    await click('.card [test-id="order-list-details-btn"]');

    // assert initial state
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CARD £0.00');
    assert.strictEqual(this.element.querySelectorAll('.card .list-group-item').length, 0);

    // edit
    await click('.card [test-id="order-card-edit"]');
    // initial state
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 0);
    assertOrderInfo(assert, this.element, '0 items', '£0.00');

    // add menu item
    await click('.order-pad_left_bottom_menu .list-group-item');
    assertOrderInfo(assert, this.element, '1 item', '£42.00');
    // add edit option
    await click('.order-pad_right_items .list-group-item:nth-child(1)');
    await click('.order-pad_right_items .list-group-item:nth-child(1) button:nth-child(2)');
    await click('.modal-body .container-fluid.d-none.d-lg-block .btn-group-vertical button:nth-child(2)');
    await click('.modal-footer button');
    assertOrderInfo(assert, this.element, '1 item', '£43.50');

    await click('.order-pad_right_actions .btn-danger');
    await click('.modal-footer .btn-danger');

    assert.strictEqual(currentURL(), '/orders/eat-in');

    await click('.card [test-id="order-list-details-btn"]');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CARD £0.00');
    assert.strictEqual(this.element.querySelectorAll('.card .list-group-item').length, 0);
  });

  test('confirming order transitions to and reflects updates on /orders/eat-in ', async function(assert) {
    await visit('/orders/eat-in');
    await click('.card [test-id="order-list-details-btn"]');

    // assert initial state
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CARD £0.00');
    assert.strictEqual(this.element.querySelectorAll('.card .list-group-item').length, 0);

    // edit
    await click('[test-id="order-card-edit"]');
    // initial state
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 0);
    assertOrderInfo(assert, this.element, '0 items', '£0.00');

    // add menu item
    await click('.order-pad_left_bottom_menu .list-group-item');
    assertOrderInfo(assert, this.element, '1 item', '£42.00');
    // add edit option
    await click('.order-pad_right_items .list-group-item:nth-child(1)');
    await click('.order-pad_right_items .list-group-item:nth-child(1) button:nth-child(2)');
    await click('.modal-body .container-fluid.d-none.d-lg-block .btn-group-vertical button:nth-child(2)');
    await click('.modal-footer button');
    assertOrderInfo(assert, this.element, '1 item', '£43.50');

    await click('.order-pad_right_actions .btn-success');
    await click('.modal-footer .btn-success');
    await click('.app-overlay');

    assert.strictEqual(currentURL(), '/orders/eat-in');

    await click('.card [test-id="order-list-details-btn"]');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CARD £43.50');
    assert.strictEqual(this.element.querySelectorAll('.card .list-group-item').length, 1);
  });

  test('submitting order error shows overlay', async function(assert) {
    this.server.patch('/order/eat-ins/:id', () => ({
      errors: [{ detail: 'Error message for PATCH order/eat-ins' }]
    }), 500);

    await visit('/order/eat-in/1');

    await click('.order-pad_left_bottom_menu .list-group-item');
    assertOrderInfo(assert, this.element, '1 item', '£42.00');

    await click('.order-pad_right_actions .btn-success');
    await click('.modal .btn-success');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to submit order :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error message for PATCH order/eat-ins'));

    await click('.app-overlay');

    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 1);
    let text = splitByNewline(this.element.querySelector('.order-pad_right_customer .col > div').textContent);
    assert.strictEqual(text.length, 3);
    assert.strictEqual(text[0], 'Table 1');
    assert.strictEqual(text[1], '2');
    assert.strictEqual(text[2], 'ID: AAA111');
    assertOrderInfo(assert, this.element, '1 item', '£42.00');
  });

});
