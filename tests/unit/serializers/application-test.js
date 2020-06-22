import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('application');

    assert.ok(serializer);
  });

  test('it serializes all records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('setting', { name: 'settingName', value: 1 });

    assert.deepEqual(record.serialize(), {
      data: {
        type: 'settings',
        attributes: {
          name: 'settingName',
          value: 1
        }
      }
    });
  });
});
