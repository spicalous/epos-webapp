import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | delivery-customer-tags', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:delivery-customer-tags');
    assert.ok(route);
  });
});
