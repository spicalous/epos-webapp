import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:order', 'Unit | Controller | order', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it filters orders by payment type', function(assert) {
  let controller = this.subject();

  Ember.run(() => {

    controller.set('model', Ember.A([
      Ember.Object.create({ paymentMethod: 'CARD' }),
      Ember.Object.create({ paymentMethod: 'CASH' }),
      Ember.Object.create({ paymentMethod: null })
    ]));

    assert.equal(controller.get('cardOrders').length, 1);
    assert.equal(controller.get('cashOrders').length, 1);
    assert.equal(controller.get('notPaidOrders').length, 1);
  });

});
