import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | orders/eat-in', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:orders/eat-in');
    assert.ok(route);
  });
});
