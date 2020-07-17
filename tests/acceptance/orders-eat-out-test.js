import { module, test } from 'qunit';
import { currentURL, visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { Response } from 'ember-cli-mirage';

module('Acceptance | orders/eat-out', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
  });

  test('pressing back routes to index', async function(assert) {
    await visit('/orders/eat-out');
    await click('.btn-outline-light');
    assert.strictEqual(currentURL(), '/');
  });

  test('coming back to orders restores scroll position', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-out');

    assert.ok(-5 < this.element.parentElement.scrollTop && this.element.parentElement.scrollTop < 5);
    this.element.querySelector('.card:nth-child(6)').scrollIntoView();
    assert.ok(480 < this.element.parentElement.scrollTop && this.element.parentElement.scrollTop < 490);

    await click('.card:nth-child(6) [test-id="order-card-edit"]');
    await click('.order-pad_right_actions .btn-danger');
    await click('.modal-footer .btn-primary');

    assert.ok(480 < this.element.parentElement.scrollTop && this.element.parentElement.scrollTop < 490);
  });

  test('show "No orders to display" when no orders', async function(assert) {
    await visit('/orders/eat-out');

    assert.strictEqual(
      this.element.querySelector('.container-fluid > div:last-child').textContent.trim(),
      'No orders to display',
      'correct message displayed');
  });

  test('renders orders in card list', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-out');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 8, 'correct number of orders displayed');
  });

  test('order summary', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-out');
    await click('button#order-summary-btn');

    assertOrderSummary(assert, this.element,
      ['2', '57.45'],
      ['2', '61.15'],
      ['2', '84.90'],
      ['2', '58.00'],
      ['3', '70.50'],
      ['3', '106.10'],
      ['2', '84.90'],
      ['8', '261.50']);
  });

  test('order summary is updated when order is edited', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-out');
    await click('button#order-summary-btn');

    assertOrderSummary(assert, this.element,
      ['2', '57.45'],
      ['2', '61.15'],
      ['2', '84.90'],
      ['2', '58.00'],
      ['3', '70.50'],
      ['3', '106.10'],
      ['2', '84.90'],
      ['8', '261.50']);

    await click('.card [test-id="order-card-edit"]');
    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_actions .btn-success');
    await click('.modal-footer .btn-success');
    await click('.app-overlay');

    assertOrderSummary(assert, this.element,
      ['2', '57.45'],
      ['2', '61.15'],
      ['2', '126.90'],
      ['2', '58.00'],
      ['3', '70.50'],
      ['3', '106.10'],
      ['2', '126.90'],
      ['8', '303.50']);
  });

  test('all filters selected by default', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-out');

    assert.strictEqual(this.element.querySelectorAll('[test-id="payment-type-filters"] button.btn-primary').length, 4, 'order filters selected');
    assert.strictEqual(this.element.querySelectorAll('[test-id="order-type-filters"] button.btn-primary').length, 3, 'payment filters selected');
  });

  test('filters by order type', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-out');

    await click('[test-id="order-type-filters"] button');

    assert.strictEqual(this.element.querySelectorAll('[test-id="order-type-filters"] button.btn-primary').length, 2);
    assert.strictEqual(this.element.querySelectorAll('[test-id="order-type-filters"] button.btn-main-secondary').length, 1);
    assert.strictEqual(this.element.querySelectorAll('.card').length, 5, 'only orders with selected order type displayed');
  });

  test('filters by payment type', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-out');

    await click('[test-id="payment-type-filters"] button');

    assert.strictEqual(this.element.querySelectorAll('[test-id="payment-type-filters"] button.btn-primary').length, 3);
    assert.strictEqual(this.element.querySelectorAll('[test-id="payment-type-filters"] button.btn-main-secondary').length, 1);
    assert.strictEqual(this.element.querySelectorAll('.card').length, 6, 'only orders with selected payment type displayed');
  });

  test('printing small makes a GET request', async function(assert) {
    this.server.loadFixtures();
    this.server.get('/printer/order/:orderType/:receiptType/:orderId', function(schema, request) {
      assert.strictEqual(request.params.orderType, 'eat-out');
      assert.strictEqual(request.params.receiptType, 'EAT_IN');
      assert.strictEqual(request.params.orderId, '8');
    });

    await visit('/orders/eat-out');
    await click('.card .row .dropdown .dropdown-toggle');
    await click('.card .row .dropdown .dropdown-menu button');

    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().startsWith('Order printed successfully'));
    assert.expect(4);
  });

  test('printing big makes a GET request', async function(assert) {
    this.server.loadFixtures();
    this.server.get('/printer/order/:orderType/:receiptType/:orderId', function(schema, request) {
      assert.strictEqual(request.params.orderType, 'eat-out');
      assert.strictEqual(request.params.receiptType, 'DELIVERY');
      assert.strictEqual(request.params.orderId, '8');
    });

    await visit('/orders/eat-out');
    await click('.card .row .dropdown .dropdown-toggle');
    await click('.card .row .dropdown .dropdown-menu button:nth-child(2)');

    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().startsWith('Order printed successfully'));
    assert.expect(4);
  });

  test('failing print shows error message', async function(assert) {
    this.server.loadFixtures();
    this.server.get('/printer/order/:orderType/:receiptType/:orderId', () => {
      return new Response(500, {}, { errors: [{ detail: 'Error message for print failure' }]});
    });

    await visit('/orders/eat-out');
    await click('.card .row .dropdown .dropdown-toggle');
    await click('.card .row .dropdown .dropdown-menu button:nth-child(2)');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Order failed to print');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error message for print failure'));
  });

  test('updating payment method', async function(assert) {
    this.server.loadFixtures();

    await visit('/orders/eat-out');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'ONLINE £14.95');

    await click('[test-id="order-card-payment-info"]');
    await click('[test-id="order-card-payment-info"] + div.dropdown-menu button:nth-child(1)');

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £14.95');
  });

  test('updating payment method failure', async function(assert) {
    this.server.loadFixtures();
    this.server.patch('/order/eat-outs/:id', () => {
      return new Response(500, {}, { errors: [{ detail: 'Update payment method failure reason' }]});
    });

    await visit('/orders/eat-out');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'ONLINE £14.95');

    await click('[test-id="order-card-payment-info"]');
    await click('[test-id="order-card-payment-info"] + div.dropdown-menu button:nth-child(1)');

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'ONLINE £14.95');
  });

  function assertOrderSummary(assert, element, cash, card, onlinePayment, notPaid, takeAway, delivery, onlineCustomer, all) {
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(1)').textContent, cash[0], 'cash order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(1)').textContent, cash[1], 'cash order total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(2)').textContent, card[0], 'card order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(2)').textContent, card[1], 'card order total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(3)').textContent, onlinePayment[0], 'online order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(3)').textContent, onlinePayment[1], 'online order total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(4)').textContent, notPaid[0], 'not paid order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(4)').textContent, notPaid[1], 'not paid total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(6)').textContent, takeAway[0], 'customer take away order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(6)').textContent, takeAway[1], 'customer take away order total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(7)').textContent, delivery[0], 'customer delivery order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(7)').textContent, delivery[1], 'customer delivery order total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(8)').textContent, onlineCustomer[0], 'customer online order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(8)').textContent, onlineCustomer[1], 'customer online order total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(10)').textContent, all[0], 'total order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(10)').textContent, all[1], 'total order total');
  }
});
