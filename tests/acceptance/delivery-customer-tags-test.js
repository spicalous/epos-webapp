import { module, test } from 'qunit';
import { currentURL, visit, click } from '@ember/test-helpers';
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
    assert.strictEqual(this.element.querySelectorAll('.list-group-item').length, 1);
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

});
