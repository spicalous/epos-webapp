import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | order/details-actions', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('emptyFn', () => {});
    this.set('mockOrder', {
      notes: 'order note',
      orderItems: [
        { quantity: 1, menuItem: { menuId: '1A', name: 'menu item one' }, editOptions: [{ name: 'edit option 1' }, { name: 'edit option 2' }]},
        { quantity: 2, menuItem: { menuId: '2A', name: 'menu item two' }, editOptions: [{ name: 'edit option 3' }]}
      ]
    });
  });

  test('does not display notes and order items by default', async function(assert) {
    await render(hbs`<Order::DetailsActions @order={{this.mockOrder}} @onPrintOrder={{this.emptyFn}}/>`);

    assert.strictEqual(this.element.querySelector('.row div:nth-child(1) button').textContent.trim(), 'Edit');
    assert.strictEqual(this.element.querySelector('.row div:nth-child(2) button').textContent.trim(), 'Show details');
    assert.strictEqual(this.element.querySelector('.row div:nth-child(3) button').textContent.trim(), 'Print');
    assert.notOk(this.element.querySelector('[test-id="order-list-item-notes"]'));
  });

  test('toggling order notes and order items', async function(assert) {
    await render(hbs`<Order::DetailsActions @order={{this.mockOrder}} @onPrintOrder={{this.emptyFn}}/>`);

    await click('.row div:nth-child(2) button');
    assert.strictEqual(this.element.querySelector('[test-id="order-list-item-notes"]').textContent.trim(), 'order note');
    assert.strictEqual(this.element.querySelectorAll('.list-group-item').length, 2);
    assert.strictEqual(this.element.querySelectorAll('.list-group-item div').length, 3);

    await click('.row div:nth-child(2) button');
    assert.notOk(this.element.querySelector('[test-id="order-list-item-notes"]'));
    assert.strictEqual(this.element.querySelectorAll('.list-group-item').length, 0);
    assert.strictEqual(this.element.querySelectorAll('.list-group-item div').length, 0);
  });

  test('printing order/eat-out calls onPrintOrder with correct arguments', async function(assert) {
    this.set('onPrintOrder', (id, modelName, receiptType) => assert.step(`${id} ${modelName} ${receiptType}`));
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out', { id: 42 }));

    await render(hbs`<Order::DetailsActions @order={{this.order}} @onPrintOrder={{this.onPrintOrder}}/>`);

    await click('.row div:nth-child(3) button');
    await click('.row div:nth-child(3) .dropdown-item:nth-child(1)');
    await click('.row div:nth-child(3) .dropdown-item:nth-child(2)');

    assert.verifySteps(['42 order/eat-out EAT_IN', '42 order/eat-out DELIVERY']);
  });

  test('printing order/eat-in calls onPrintOrder with correct arguments', async function(assert) {
    this.set('onPrintOrder', (id, modelName, receiptType) => assert.step(`${id} ${modelName} ${receiptType}`));
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-in', { id: 42 }));

    await render(hbs`<Order::DetailsActions @order={{this.order}} @onPrintOrder={{this.onPrintOrder}}/>`);

    await click('.row div:nth-child(3) button');
    await click('.row div:nth-child(3) .dropdown-item:nth-child(1)');
    await click('.row div:nth-child(3) .dropdown-item:nth-child(2)');

    assert.verifySteps(['42 order/eat-in EAT_IN', '42 order/eat-in DELIVERY']);
  });

});
