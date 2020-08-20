import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { UIStub } from 'epos-webapp/tests/util';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | order/total-info', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  function createOrderWithOrderModifier(orderModifierAttrs, optionalPrice) {
    let menuItem = this.server.create('menu-item', mockMenuItem('1', 'menu item one', optionalPrice || 1095));
    let orderItem = this.server.create('order-item', { quantity: 1, menuItem, editOptions: [] });
    let orderModifier = this.server.create('order-modifier', orderModifierAttrs);
    this.server.create('order/eat-out', { ...mockOrder(null, [orderItem]), orderModifier });
    return this.owner.lookup('service:store').findRecord('order/eat-out', 1, { include: 'orderItems.menuItem,orderModifier' });
  }

  function mockOrder(paymentMethod, orderItems) {
    return { dateTime: '2016-03-09T12:34:45.000Z', notes: '', estimatedTime: 45, paymentMethod, customer: null, orderItems };
  }

  function mockMenuItem(menuId, name, price) {
    return {
      menuId,
      name,
      description: '',
      price,
      emphasisOnPrint: false,
      categories: [],
      editCategories: []
    };
  }

  hooks.beforeEach(async function() {
    this.server.db.emptyData();
    this.owner.register('service:ui', UIStub);
    this.createOrderWithOrderModifier = createOrderWithOrderModifier.bind(this);
  });

  test('it renders', async function(assert) {
    this.server.create('order/eat-out', mockOrder(null, []));
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1));

    await render(hbs`<Order::TotalInfo @order={{this.order}} />`);
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £0.00');

    this.set('order.paymentMethod', 'ARBITRARY');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'ARBITRARY £0.00');
  });

  test('updating payment method', async function(assert) {
    this.server.create('order/eat-out', mockOrder(null, []));
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1));

    await render(hbs`<Order::TotalInfo @order={{this.order}} />`);
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £0.00');

    await click('.dropdown-menu');
    await click('.dropdown-item:nth-child(2)');

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CASH £0.00');
    const uiService = this.owner.lookup('service:ui');
    assert.strictEqual(uiService.message, 'Updated payment method');
  });

  test('fail updating payment method rollsback attributes', async function(assert) {
    this.server.create('order/eat-out', mockOrder(null, []));
    this.server.patch('/order/eat-outs/:id', 500);
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1));

    await render(hbs`<Order::TotalInfo @order={{this.order}} />`);
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £0.00');

    await click('.dropdown-menu');
    await click('.dropdown-item:nth-child(2)');

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £0.00');
    const uiService = this.owner.lookup('service:ui');
    assert.strictEqual(uiService.message, 'Failed to update payment method');
  });

  test('percent discount', async function(assert) {
    this.set('order', await this.createOrderWithOrderModifier({ type: 'PERCENT', value: 10 }));

    await render(hbs`<Order::TotalInfo @order={{this.order}} />`);

    // also ensures that that we do not run into rounding errors
    //   10.95           10.95
    // -  1.095           1.10
    // =  9.855 -> 9.86   9.85
    assert.strictEqual(this.element.querySelector('[test-id="order-modifier"] div:nth-child(1)').textContent.trim(), 'Sub-total: £10.95');
    assert.strictEqual(this.element.querySelector('[test-id="order-modifier"] div:nth-child(2)').textContent.trim(), 'Discount: -£1.10 (10%)');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £9.85');
  });

  test('percent discount test rounding', async function(assert) {
    this.set('order', await this.createOrderWithOrderModifier({ type: 'PERCENT', value: 10 }, 1335));

    await render(hbs`<Order::TotalInfo @order={{this.order}} />`);

    // also ensures that that we do not run into rounding errors
    //   13.35             13.35
    // -  1.335             1.34
    // = 12.015 -> 12.02   12.01
    assert.strictEqual(this.element.querySelector('[test-id="order-modifier"] div:nth-child(1)').textContent.trim(), 'Sub-total: £13.35');
    assert.strictEqual(this.element.querySelector('[test-id="order-modifier"] div:nth-child(2)').textContent.trim(), 'Discount: -£1.34 (10%)');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £12.01');
  });

  test('absolute discount', async function(assert) {
    this.set('order', await this.createOrderWithOrderModifier({ type: 'ABSOLUTE', value: 123 }));

    await render(hbs`<Order::TotalInfo @order={{this.order}} />`);

    assert.strictEqual(this.element.querySelector('[test-id="order-modifier"] div:nth-child(1)').textContent.trim(), 'Sub-total: £10.95');
    assert.strictEqual(this.element.querySelector('[test-id="order-modifier"] div:nth-child(2)').textContent.trim(), 'Discount: -£1.23');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £9.72');
  });

  test('unknown type discount', async function(assert) {
    this.set('order', await this.createOrderWithOrderModifier({ type: 'UNKNOWN', value: 5 }));

    await render(hbs`<Order::TotalInfo @order={{this.order}} />`);

    assert.strictEqual(this.element.querySelector('[test-id="order-modifier"] div:nth-child(1)').textContent.trim(), 'Sub-total: £10.95');
    assert.strictEqual(this.element.querySelector('[test-id="order-modifier"] div:nth-child(2)').textContent.trim(), 'Discount: Unknown "UNKNOWN" type');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £10.95');
  });

});
