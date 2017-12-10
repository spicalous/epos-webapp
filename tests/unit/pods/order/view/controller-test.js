import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:order/view', 'Unit | Controller | order/view', {
  needs: ['adapter:application']
});

let mockOrderTypes = A([
  EmberObject.create({
    customer: { constructor: { modelName: 'delivery-customer'} },
    paymentMethod: null
  }),
  EmberObject.create({
    customer: { constructor: { modelName: 'delivery-customer'} },
    paymentMethod: 'CASH'
  }),
  EmberObject.create({
    customer: { constructor: { modelName: 'takeaway-customer'} },
    paymentMethod: 'CARD'
  }),
  EmberObject.create({
    customer: { constructor: { modelName: 'takeaway-customer'} },
    paymentMethod: 'ONLINE'
  })
]);

test('does not filter orders by default', function(assert) {
  let controller = this.subject({ model: mockOrderTypes });

  assert.equal(controller.get('filteredOrders').length, 4);
});

test('filters orders by payment type', function(assert) {
  let controller = this.subject({ model: mockOrderTypes });

  ['Not paid', 'Cash', 'Card', 'Online'].forEach((filter) => {
    controller.set('paymentTypeFilter', filter);
    assert.equal(controller.get('filteredOrders').length, 1);
  });
});

test('filters orders by customer type', function(assert) {
  let controller = this.subject({ model: mockOrderTypes });

  ['Delivery', 'Takeaway'].forEach((filter) => {
    controller.set('orderTypeFilter', filter);
    assert.equal(controller.get('filteredOrders').length, 2);
  });
});

test('intersects filtered orders when both filters are set', function(assert) {
  let controller = this.subject({ model: mockOrderTypes });

  controller.set('paymentTypeFilter', 'Not paid');
  controller.set('orderTypeFilter', 'Delivery');
  assert.equal(controller.get('filteredOrders').length, 1);
});

test('generates absolute namespace', function(assert) {
  let controller = this.subject();
  const namespace = controller._getNamespace();

  assert.equal(namespace, '/EPOSDataService/api/printer');
});
