import { module, test } from 'qunit';
import { currentURL, fillIn, visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { splitByNewline } from 'epos-webapp/tests/util';

module('Acceptance | delivery-customers', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
    this.loadCustomersAndTagsFixtures = () => {
      this.server.loadFixtures('customer/deliveries');
      this.server.loadFixtures('delivery-customer-tags');
    };
  });

  test('pressing back routes to index', async function(assert) {
    await visit('/delivery-customers');
    await click('nav .btn-outline-light');
    assert.strictEqual(currentURL(), '/');
  });

  test('navigate to edit delivery customer tags', async function(assert) {
    await visit('/delivery-customers');
    await click('nav .flex-even:nth-child(3) .btn-outline-light');
    assert.strictEqual(currentURL(), '/delivery-customer-tags');
  });

  test('searching for customers', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await visit('/delivery-customers');
    await fillIn('input[placeholder="Telephone"]', '020');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 4);
  });

  test('deleting customer conflict error', async function(assert) {
    this.loadCustomersAndTagsFixtures();
    this.server.del('/customer/deliveries/:id', () => ({
      'errors':[{'status':'409','title':'Conflict','detail':'Cannot delete delivery customer. Customer is reference by order id=1'}]
    }), 409);

    await visit('/delivery-customers');
    await fillIn('input[placeholder="Telephone"]', '020');

    await click('.btn-danger');
    await click('.modal .btn-danger');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to delete customer :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Cannot delete delivery customer. Customer is reference by order id=1'));
    assert.strictEqual(this.element.querySelectorAll('.card').length, 4);
  });

  test('deleting customer not found error', async function(assert) {
    this.loadCustomersAndTagsFixtures();
    this.server.del('/customer/deliveries/:id', () => ({
      'errors':[{'status':'404','title':'Not Found','detail':'Delivery customer id=1 does not exist'}]
    }), 404);

    await visit('/delivery-customers');
    await fillIn('input[placeholder="Telephone"]', '020');

    await click('.btn-danger');
    await click('.modal .btn-danger');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to delete customer :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Delivery customer id=1 does not exist'));
    assert.strictEqual(this.element.querySelectorAll('.card').length, 4);
  });

  test('deleting customer', async function(assert) {
    this.loadCustomersAndTagsFixtures();
    await visit('/delivery-customers');
    await fillIn('input[placeholder="Telephone"]', '020');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 4);

    await click('.btn-danger');
    await click('.modal .btn-danger');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 3);
  });

  test('editing customer error show overlay', async function(assert) {
    this.loadCustomersAndTagsFixtures();
    this.server.patch('/customer/deliveries/:id', () => ({
      'errors':[{'status':'500','title':'Error Title','detail':'Error editing customer'}]
    }), 500);

    await visit('/delivery-customers');
    await fillIn('input[placeholder="Telephone"]', '020');

    await click('.btn-main-secondary');
    await fillIn('.card-body input[placeholder="Postcode"]', 'ABC 123');
    await click('.card-body .btn-primary');
    await click('.modal .btn-primary');

    assert.strictEqual(this.element.querySelector('.app-overlay h2').textContent.trim(), 'Failed to save customer :(');
    assert.ok(this.element.querySelector('.app-overlay').textContent.trim().includes('Error editing customer'));
  });

  test('editing customer', async function(assert) {
    this.loadCustomersAndTagsFixtures();
    await visit('/delivery-customers');
    await fillIn('input[placeholder="Telephone"]', '020');

    let initial = splitByNewline(this.element.querySelector('.card-body p').textContent);
    assert.strictEqual(initial[0], '02011111111');
    assert.strictEqual(initial[1], '1');
    assert.strictEqual(initial[2], 'ONE ROAD');
    assert.strictEqual(initial[3], 'AB1 2CD');

    await click('.btn-main-secondary');
    await fillIn('.card-body input[placeholder="Postcode"]', 'ABC 123');
    await click('.card-body .btn-primary');
    await click('.modal .btn-primary');

    let after = splitByNewline(this.element.querySelector('.card-body p').textContent);
    assert.strictEqual(after[0], '02011111111');
    assert.strictEqual(after[1], '1');
    assert.strictEqual(after[2], 'ONE ROAD');
    assert.strictEqual(after[3], 'ABC 123');
  });

  test('editing customer adding tags', async function(assert) {
    this.loadCustomersAndTagsFixtures();
    await visit('/delivery-customers');
    await fillIn('input[placeholder="Telephone"]', '020');

    assert.notOk(this.element.querySelector('.card:nth-child(1) .card-body .badge'));

    await click('.btn-main-secondary');
    await click('.dropdown-toggle');
    await click('.dropdown-item');
    await click('.card-body .btn-primary');
    await click('.modal .btn-primary');

    assert.ok(this.element.querySelector('.card:nth-child(1) .card-body .badge'));
  });
});
