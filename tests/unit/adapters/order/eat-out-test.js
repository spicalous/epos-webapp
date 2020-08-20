import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | eat out', function(hooks) {
  setupTest(hooks);

  test('appends print on URL on create', function(assert) {
    let adapter = this.owner.lookup('adapter:order/eat-out');

    assert.strictEqual(
      '/EPOSDataService/api/order/eat-outs?print=true',
      adapter.urlForCreateRecord('order/eat-out', { snapshot: true }));
  });

  test('appends print on URL on update if true', function(assert) {
    let adapter = this.owner.lookup('adapter:order/eat-out');

    assert.strictEqual(
      '/EPOSDataService/api/order/eat-outs/1',
      adapter.urlForUpdateRecord(1, 'order/eat-out', { snapshot: true }));
    assert.strictEqual(
      '/EPOSDataService/api/order/eat-outs/1?print=true',
      adapter.urlForUpdateRecord(1, 'order/eat-out', { snapshot: true, adapterOptions: { print: true }}));
  });
});
