import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | eat in', function(hooks) {
  setupTest(hooks);

  test('appends print on URL if true', function(assert) {
    let adapter = this.owner.lookup('adapter:order/eat-in');

    assert.strictEqual(
      adapter.urlForUpdateRecord(1, 'order/eat-in', { snapshot: true }),
      '/EPOSDataService/api/order/eat-ins/1');
    assert.strictEqual(
      '/EPOSDataService/api/order/eat-ins/1?print=true',
      adapter.urlForUpdateRecord(1, 'order/eat-in', { snapshot: true, adapterOptions: { print: true }}));
  });
});
