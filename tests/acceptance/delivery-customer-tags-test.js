import { module, test } from 'qunit';
import { currentURL, visit, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | delivery-customer-tags', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
  });

  test('pressing back routes to delivery-customers', async function(assert) {
    await visit('/delivery-customer-tags');
    await click('nav .btn-outline-light');
    assert.strictEqual(currentURL(), '/delivery-customers');
  });

  test('displays all tags', async function(assert) {
    this.server.loadFixtures('deliveryCustomerTags');
    await visit('/delivery-customer-tags');
    assert.strictEqual(this.element.querySelectorAll('.card').length, 1);
  });

  test('displays error and allows retry if server error', async function(assert) {
    this.server.get('/delivery-customer-tags', () => {
      assert.step('server called');
      return { errors: [{ detail: 'Any error message' }]};
    }, 500);

    await visit('/delivery-customer-tags');

    assert.strictEqual(this.element.querySelector('.col-12:nth-child(1)').textContent.trim(), 'Failed to load delivery customer tags');
    assert.strictEqual(this.element.querySelector('.col-12:nth-child(2) button').textContent.trim(), 'Retry');

    await click('.btn-primary');

    assert.verifySteps(['server called', 'server called']);
  });

  test('creating new delivery-customer-tag', async function(assert) {
    await visit('/delivery-customer-tags');
    assert.ok('.btn-secondary[disabled]');

    await fillIn('input', 'New tag name');
    await click('.dropdown-menu');
    await click('.dropdown-item:nth-child(3)');
    await click('.btn-primary');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 1);
  });

  test('creating new delivery-customer-tag error shows app overlay', async function(assert) {
    this.server.post('/delivery-customer-tags', () => ({ errors: [{ detail: 'Error message for tag creation' }]}), 500);

    await visit('/delivery-customer-tags');
    assert.ok('.btn-secondary[disabled]');

    await fillIn('input', 'New tag name');
    await click('.dropdown-menu');
    await click('.dropdown-item:nth-child(3)');
    await click('.btn-primary');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to create delivery customer tag :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error message for tag creation'));
    assert.strictEqual(this.element.querySelectorAll('.card').length, 0);
  });

  test('editing delivery-customer-tag', async function(assert) {
    this.server.loadFixtures('deliveryCustomerTags');

    await visit('/delivery-customer-tags');
    await click('.card .btn');
    await fillIn('.card input', 'New tag name');
    await click('.card .dropdown-menu');
    await click('.card .dropdown-item:nth-child(3)');
    await click('.card .btn-primary');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 1);
    assert.strictEqual(this.element.querySelector('.card span').textContent.trim(), 'New tag name');
    assert.ok(this.element.querySelector('.card span.badge-success'));
  });

  test('editing delivery-customer-tag error shows app overlay', async function(assert) {
    this.server.loadFixtures('deliveryCustomerTags');
    this.server.patch('/delivery-customer-tags/:id', () => ({ errors: [{ detail: 'Error message for tag edit' }]}), 500);

    await visit('/delivery-customer-tags');
    await click('.card .btn');
    await fillIn('.card input', 'New tag name');
    await click('.card .btn-primary');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to save delivery customer tag :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error message for tag edit'));
    assert.strictEqual(this.element.querySelectorAll('.card').length, 1);
  });

  test('deleting delivery-customer-tag', async function(assert) {
    this.server.loadFixtures('deliveryCustomerTags');

    await visit('/delivery-customer-tags');
    await click('.card .btn');
    await click('.card .btn-danger');
    await click('.modal .btn-danger');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 0);
  });

  test('deleting delivery-customer-tag error shows app overlay', async function(assert) {
    this.server.loadFixtures('deliveryCustomerTags');
    this.server.del('/delivery-customer-tags/:id', () => ({ errors: [{ detail: 'Error message for tag delete' }]}), 500);

    await visit('/delivery-customer-tags');
    await click('.card .btn');
    await click('.card .btn-danger');
    await click('.modal .btn-danger');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to delete delivery customer tag :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error message for tag delete'));
    assert.strictEqual(this.element.querySelectorAll('.card').length, 1);
  });
});
