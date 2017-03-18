import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:order/edit/create', 'Unit | Controller | order/edit/create', {
  needs: [
    'model:online-customer',
    'model:takeaway-customer'
  ]
});

test('sets the correct paymentType and estimatedTime for online customers', function(assert) {
  let controller = this.subject();
  Ember.run(() => controller.send('setNewOnlineCustomer'));

  assert.strictEqual(controller.get('paymentMethod'), 'ONLINE');
  assert.strictEqual(controller.get('estimatedTime'), 20);
});

test('sets the correct estimatedTime for takeaway customers', function(assert) {
  let controller = this.subject();
  Ember.run(() => controller.send('setNewTakeawayCustomer'));

  assert.strictEqual(controller.get('estimatedTime'), 30);
});

test('resets estimatedTime and paymentMethod when removing customers', function(assert) {
  let controller = this.subject();
  Ember.run(() => {
    controller.send('setNewOnlineCustomer');
    controller.send('removeCustomer');
  });

  assert.strictEqual(controller.get('estimatedTime'), 45);
  assert.strictEqual(controller.get('paymentMethod'), null);
});
