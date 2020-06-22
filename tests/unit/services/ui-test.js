import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | ui', function(hooks) {
  setupTest(hooks);

  // tested via acceptance tests
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:ui');
    assert.ok(service);
  });
});
