import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | order', function(hooks) {
  setupTest(hooks);

  test('calculated order total', async function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('order', {
      date: new Date(),
      orderItems: [
        store.createRecord('order-item', {
          quantity: 1,
          menuItem: store.createRecord('menu-item', { price: 10 }),
          editOptions: []
        }),
        store.createRecord('order-item', {
          quantity: 1,
          menuItem: store.createRecord('menu-item', { price: 20 }),
          editOptions: [store.createRecord('edit-option', { price: 30 })]
        }),
        store.createRecord('order-item', {
          quantity: 2,
          menuItem: store.createRecord('menu-item', { price: 40 }),
          editOptions: [store.createRecord('edit-option', { price: 50 })]
        })
      ]
    });

    assert.strictEqual(model.total, 240);
  });

});
