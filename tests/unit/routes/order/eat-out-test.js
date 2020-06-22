import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | order/eat-out', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:order/eat-out');
    assert.ok(route);
  });
});
