import { module, test } from 'qunit';
import { currentURL, visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | orders/eat-in', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
  });

  test('pressing back routes to index', async function(assert) {
    await visit('/orders/eat-in');
    await click('nav .btn-outline-light');
    assert.strictEqual(currentURL(), '/');
  });

  test('all filters selected by default', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-in');

    assert.strictEqual(this.element.querySelectorAll('[test-id="payment-type-filters"] button.btn-primary').length, 4, 'order filters selected');
  });

  test('filters by payment type', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-in');

    await click('[test-id="payment-type-filters"] button');

    assert.strictEqual(this.element.querySelectorAll('[test-id="payment-type-filters"] button.btn-primary').length, 3);
    assert.strictEqual(this.element.querySelectorAll('[test-id="payment-type-filters"] button.btn-main-secondary').length, 1);
    assert.strictEqual(this.element.querySelectorAll('.card').length, 2, 'only orders with selected payment type displayed');
  });

  test('error displayed if creating table error', async function(assert) {
    this.server.post('/order/eat-ins', 500);

    await visit('/orders/eat-in');
    await click('.fixed-bottom-right-btn');
    await fillIn('.modal input', '123');
    await click('.modal-footer .btn-primary');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to create table :(');
  });

  test('creating order displays in order list', async function(assert) {
    await visit('/orders/eat-in');
    await click('.fixed-bottom-right-btn');
    await fillIn('.modal input', 'table name');
    await click('.modal-footer .btn-primary');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 1);
  });

  test('coming back to orders restores scroll position', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-in');
    this.element.parentElement.scrollTo(0,0); // reset before test

    assert.strictEqual(this.element.parentElement.scrollTop, 0);
    this.element.querySelector('.card:nth-child(3)').scrollIntoView();
    assert.ok(316 < this.element.parentElement.scrollTop && this.element.parentElement.scrollTop < 336, `scrollTop=${this.element.parentElement.scrollTop}`);

    await click('.card:nth-child(3) [test-id="order-card-edit"]');
    await click('.order-pad_right_actions .btn-danger');
    await click('.modal-footer .btn-danger');

    assert.ok(316 < this.element.parentElement.scrollTop && this.element.parentElement.scrollTop < 336, `scrollTop=${this.element.parentElement.scrollTop}`);
    this.element.parentElement.scrollTo(0,0); // reset after test
  });

  test('show "No orders to display" when no orders', async function(assert) {
    await visit('/orders/eat-in');

    assert.strictEqual(
      this.element.querySelector('.container-fluid > div:last-child').textContent.trim(),
      'No orders to display',
      'correct message displayed');
  });

  test('removing order modifier loaded from back end', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-in');

    assert.strictEqual(this.element.querySelector('.card:nth-child(2) .row .dropdown .dropdown-item:nth-child(4)').textContent.trim(), 'Remove discount');
    assert.strictEqual(this.element.querySelector('.card:nth-child(2) [test-id="order-modifier"] div:nth-child(1)').textContent.trim(), 'Sub-total: £5.25');
    assert.strictEqual(this.element.querySelector('.card:nth-child(2) [test-id="order-modifier"] div:nth-child(2)').textContent.trim(), 'Discount: -£1.25');
    assert.strictEqual(this.element.querySelector('.card:nth-child(2) [test-id="order-card-payment-info"]').textContent.trim(), 'CASH £4.00');

    await click('.card:nth-child(2) .row .dropdown .dropdown-toggle');
    await click('.card:nth-child(2) .row .dropdown .dropdown-item:nth-child(4)');

    assert.strictEqual(this.element.querySelector('.card:nth-child(2) .row .dropdown .dropdown-item:nth-child(4)').textContent.trim(), 'Apply discount');
    assert.notOk(this.element.querySelector('.card:nth-child(2) [test-id="order-modifier"]'));
    assert.strictEqual(this.element.querySelector('.card:nth-child(2) [test-id="order-card-payment-info"]').textContent.trim(), 'CASH £5.25');
  });

  test('removing order modifier loaded from back end failure', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-in');

    assert.strictEqual(this.element.querySelector('.card:nth-child(2) .row .dropdown .dropdown-item:nth-child(4)').textContent.trim(), 'Remove discount');
    assert.strictEqual(this.element.querySelector('.card:nth-child(2) [test-id="order-modifier"] div:nth-child(1)').textContent.trim(), 'Sub-total: £5.25');
    assert.strictEqual(this.element.querySelector('.card:nth-child(2) [test-id="order-modifier"] div:nth-child(2)').textContent.trim(), 'Discount: -£1.25');
    assert.strictEqual(this.element.querySelector('.card:nth-child(2) [test-id="order-card-payment-info"]').textContent.trim(), 'CASH £4.00');

    this.server.patch('/order/eat-ins/:id', () => ({ errors: [{ detail: 'Error message for PATCH order/eat-ins' }]}), 500);
    await click('.card:nth-child(2) .row .dropdown .dropdown-toggle');
    await click('.card:nth-child(2) .row .dropdown .dropdown-item:nth-child(4)');

    assert.strictEqual(this.element.querySelector('.card:nth-child(2) .row .dropdown .dropdown-item:nth-child(4)').textContent.trim(), 'Remove discount');
    assert.strictEqual(this.element.querySelector('.card:nth-child(2) [test-id="order-modifier"] div:nth-child(1)').textContent.trim(), 'Sub-total: £5.25');
    assert.strictEqual(this.element.querySelector('.card:nth-child(2) [test-id="order-modifier"] div:nth-child(2)').textContent.trim(), 'Discount: -£1.25');
    assert.strictEqual(this.element.querySelector('.card:nth-child(2) [test-id="order-card-payment-info"]').textContent.trim(), 'CASH £4.00');
  });

  test('calculates order summary', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-in');

    await click('[test-id="order-card-edit"]'); // edit
    await click('.order-pad_left_bottom_menu .list-group-item'); // add order item

    await click('.order-pad_right_actions .btn-success');
    await click('.modal-footer .btn-success');
    await click('.app-overlay');

    await click('button#order-summary-btn');

    assertOrderSummary(assert, this.element,
      ['1', '4.00'],
      ['1', '42.00'],
      ['0', '0.00'],
      ['1', '0.00'],
      ['3', '46.00']);
  });

  function assertOrderSummary(assert, element, cash, card, onlinePayment, notPaid, all) {
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(1)').textContent, cash[0], 'cash order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(1)').textContent, cash[1], 'cash order total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(2)').textContent, card[0], 'card order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(2)').textContent, card[1], 'card order total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(3)').textContent, onlinePayment[0], 'online order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(3)').textContent, onlinePayment[1], 'online order total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(4)').textContent, notPaid[0], 'not paid order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(4)').textContent, notPaid[1], 'not paid total');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(2) > div:nth-child(6)').textContent, all[0], 'total order count');
    assert.strictEqual(element.querySelector('nav .dropdown-menu > div > div:nth-child(3) > div:nth-child(6)').textContent, all[1], 'total order total');
  }
});
