import { run } from '@ember/runloop';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('takeaway-customer', 'Unit | Model | takeaway customer', {
  // Specify the other units that are required for this test.
  needs: []
});

test('does not require telephone', function(assert) {
  let model = this.subject();
  assert.notOk(model.get('invalidTelephone'));
});

test('still validates telephone', function(assert) {
  let model = this.subject();
  run(() => model.set('telephone', '123456789'));
  assert.ok(model.get('invalidTelephone'));
});
