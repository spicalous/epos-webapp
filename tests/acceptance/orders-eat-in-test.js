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

  test('create button is disabled if table name is empty', async function(assert) {
    await visit('/orders/eat-in');
    await click('nav .justify-content-end .btn-outline-light');

    assert.ok(this.element.querySelector('.modal-footer .btn-secondary'));
  });

  test('error displayed if creating table error', async function(assert) {
    this.server.post('/order/eat-ins', 500);

    await visit('/orders/eat-in');
    await click('nav .justify-content-end .btn-outline-light');
    await fillIn('.modal input', '123');
    await click('.modal-footer .btn-success');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to create table :(');
  });

  test('creating order displays in order list', async function(assert) {
    await visit('/orders/eat-in');
    await click('nav .justify-content-end .btn-outline-light');
    await fillIn('.modal input', 'table name');
    await click('.modal-footer .btn-success');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 1);
  });

  test('coming back to orders restores scroll position', async function(assert) {
    this.server.loadFixtures();
    await visit('/orders/eat-in');
    this.element.parentElement.scrollTo(0,0); // reset before test

    assert.strictEqual(this.element.parentElement.scrollTop, 0);
    this.element.querySelector('.card:nth-child(3)').scrollIntoView();
    assert.ok(265 < this.element.parentElement.scrollTop && this.element.parentElement.scrollTop < 285);

    await click('.card:nth-child(3) [test-id="order-card-edit"]');
    await click('.order-pad_right_actions .btn-danger');
    await click('.modal-footer .btn-primary');

    assert.ok(265 < this.element.parentElement.scrollTop && this.element.parentElement.scrollTop < 285);
    this.element.parentElement.scrollTo(0,0); // reset after test
  });

  test('show "No orders to display" when no orders', async function(assert) {
    await visit('/orders/eat-in');

    assert.strictEqual(
      this.element.querySelector('.container-fluid > div:last-child').textContent.trim(),
      'No orders to display',
      'correct message displayed');
  });

});
