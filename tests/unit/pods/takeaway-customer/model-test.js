import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

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
  Ember.run(() => model.set('telephone', '123456789'));
  assert.ok(model.get('invalidTelephone'));
});
