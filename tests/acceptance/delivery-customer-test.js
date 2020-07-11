import { module, test } from 'qunit';
import { currentURL, fillIn, visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

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

  test('searchng for customers', async function(assert) {
    this.server.loadFixtures('customer/deliveries');

    await visit('/delivery-customer');
    await fillIn('input[placeholder="Telephone"]', '020');

    assert.strictEqual(this.element.querySelectorAll('.card').length, 3);
  });
});
