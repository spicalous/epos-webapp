import { module, test } from 'qunit';
import { currentURL, fillIn, visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { Response } from 'ember-cli-mirage';

module('Acceptance | delivery-customer', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
  });

  test('pressing back routes to index', async function(assert) {
    await visit('/delivery-customer');
    await click('nav .btn-outline-light');
    assert.strictEqual(currentURL(), '/');
  });

  test('searching for customers', async function(assert) {
    this.server.loadFixtures('customer/deliveries');

    await visit('/delivery-customer');
    await fillIn('input[placeholder="Telephone"]', '020');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 3);
  });

  test('deleting customer conflict error', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    this.server.del('/customer/deliveries/:id', () => {
      return new Response(409, {}, {'errors':[{'status':'409','title':'Conflict','detail':'Cannot delete delivery customer. Customer is reference by order id=1'}]});
    });

    await visit('/delivery-customer');
    await fillIn('input[placeholder="Telephone"]', '020');

    await click('.btn-danger');
    await click('.modal .btn-danger');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to delete customer :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Cannot delete delivery customer. Customer is reference by order id=1'));
    assert.strictEqual(this.element.querySelectorAll('.card').length, 3);
  });

  test('deleting customer not found error', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    this.server.del('/customer/deliveries/:id', () => {
      return new Response(404, {}, {'errors':[{'status':'404','title':'Not Found','detail':'Delivery customer id=1 does not exist'}]});
    });

    await visit('/delivery-customer');
    await fillIn('input[placeholder="Telephone"]', '020');

    await click('.btn-danger');
    await click('.modal .btn-danger');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to delete customer :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Delivery customer id=1 does not exist'));
    assert.strictEqual(this.element.querySelectorAll('.card').length, 3);
  });

  test('deleting customer', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    await visit('/delivery-customer');
    await fillIn('input[placeholder="Telephone"]', '020');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 3);

    await click('.btn-danger');
    await click('.modal .btn-danger');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 2);
  });
});
