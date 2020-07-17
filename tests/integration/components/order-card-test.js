import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { UIStub } from './../../util';

const OPTIONS = { include: 'orderItems.menuItem,orderItems.editOptions,customer' };

module('Integration | Component | order-card', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function() {
    this.owner.register('service:ui', UIStub);
    this.server.db.emptyData();
    let mockCustomer = this.server.create('customer/take-away', { telephone: '', name: 'take-away name' });
    let addBeef = this.server.create('edit-option', mockEditOption('ADD BEEF', 150));
    let veryHot = this.server.create('edit-option', mockEditOption('VERY HOT', 0));
    let spicyPC = this.server.create('menu-item', mockMenuItem('', 'Spicy PC', 280));
    let prawnRolls = this.server.create('menu-item', mockMenuItem('2', 'Prawn Rolls', 625));
    let beefMassaman = this.server.create('menu-item', mockMenuItem('34BF', 'BEEF Massaman', 1050));
    let steamedRice = this.server.create('menu-item', mockMenuItem('82', 'Steamed Rice', 300));
    let orderItem1 = this.server.create('order-item', mockOrderItem(2, spicyPC, []));
    let orderItem2 = this.server.create('order-item', mockOrderItem(1, prawnRolls, []));
    let orderItem3 = this.server.create('order-item', mockOrderItem(1, beefMassaman, [addBeef, veryHot]));
    let orderItem4 = this.server.create('order-item', mockOrderItem(1, steamedRice, []));
    this.server.create('order/eat-out', {
      dateTime: '2016-03-09T12:34:45.000Z',
      notes: 'This is a note',
      estimatedTime: 45,
      paymentMethod: null,
      customer: mockCustomer,
      orderItems: [orderItem1, orderItem2, orderItem3, orderItem4]
    });
    this.server.create('order/eat-out', {
      dateTime: '2016-03-09T12:34:45.000Z',
      notes: 'Order with CASH payment option',
      estimatedTime: 45,
      paymentMethod: 'CASH',
      customer: mockCustomer,
      orderItems: [orderItem1, orderItem2, orderItem3, orderItem4]
    });
    this.server.get('/order/eat-outs/:id', (schema, request) => schema['order/eatOuts'].find(request.params.id));
  });

  test('formats date time', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('printOrder', function() {});

    await render(hbs`<OrderCard @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    assert.strictEqual(this.element.querySelector('.card-body > div small').textContent, '2016/03/09 - 12:34');
  });

  test('customer data', async function(assert) {
    let store = this.owner.lookup('service:store');
    let customerRootQuerySelector = '.card-body > div > div:nth-child(2)';
    this.set('printOrder', function() {});
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('order.customer', null);

    await render(hbs`<OrderCard @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    assert.ok(this.element.querySelector('.card-body > div .icon-customer-unknown'));
    assert.strictEqual(this.element.querySelector('.card-body > div > div:nth-child(2)').textContent.trim(), 'Unknown customer type');

    this.set('order.customer',
      store.createRecord('customer/delivery', { telephone: 'telephone', addressOne: 'address one', road: 'road', postcode: 'postcode' }));
    assert.ok(this.element.querySelector('.card-body > div .icon-customer-delivery'));
    assert.strictEqual(this.element.querySelector(customerRootQuerySelector + ' > div:nth-child(1)').textContent.trim(), 'address one road');
    assert.strictEqual(this.element.querySelector(customerRootQuerySelector + ' > div:nth-child(2)').textContent.trim(), 'postcode');
    assert.strictEqual(this.element.querySelector(customerRootQuerySelector + ' > div:nth-child(3)').textContent.trim(), 'telephone');

    this.set('order.customer', store.createRecord('customer/take-away', {}));
    assert.ok(this.element.querySelector('.card-body > div .icon-customer-take-away'));
    assert.strictEqual(this.element.querySelector(customerRootQuerySelector).textContent.trim(), 'TAKE AWAY');

    this.set('order.customer', store.createRecord('customer/take-away', { telephone: 'telephone', name: 'name' }));
    assert.ok(this.element.querySelector('.card-body > div .icon-customer-take-away'));
    assert.strictEqual(this.element.querySelector(customerRootQuerySelector + ' > div:nth-child(1)').textContent.trim(), 'name');
    assert.strictEqual(this.element.querySelector(customerRootQuerySelector + ' > div:nth-child(2)').textContent.trim(), 'telephone');

    this.set('order.customer', store.createRecord('customer/online', {}));
    assert.ok(this.element.querySelector('.card-body > div .icon-customer-online'));
    assert.strictEqual(this.element.querySelector(customerRootQuerySelector).textContent.trim(), 'ONLINE ORDER');

    this.set('order.customer', store.createRecord('customer/online', { orderId: 'orderId' }));
    assert.ok(this.element.querySelector('.card-body > div .icon-customer-online'));
    assert.strictEqual(this.element.querySelector(customerRootQuerySelector).textContent.trim(), 'orderId');
  });

  test('formats null payment type', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('printOrder', function() {});

    await render(hbs`<OrderCard @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £26.85');
  });

  test('formats non null payment type', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 2, OPTIONS));
    this.set('printOrder', function() {});

    await render(hbs`<OrderCard @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CASH £26.85');
  });

  test('showing order details', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('printOrder', function() {});

    await render(hbs`<OrderCard @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    await click('button.btn-block');

    assert.strictEqual(this.element.querySelector('.card-body > [test-id="order-list-item-notes"]').textContent, 'This is a note');
    assert.strictEqual(this.element.querySelectorAll('.card-body ul li').length, 4);
    assert.strictEqual(this.element.querySelector('.card-body ul li:nth-child(1)').textContent.trim(), '2 x  Spicy PC');
    assert.strictEqual(this.element.querySelector('.card-body ul li:nth-child(2)').textContent.trim(), '1 x 2 Prawn Rolls');
    assert.strictEqual(this.element.querySelectorAll('.card-body ul li:nth-child(3) div').length, 2);
    assert.ok(this.element.querySelector('.card-body ul li:nth-child(3)').textContent.includes('1 x 34BF BEEF Massaman'));
    assert.ok(this.element.querySelector('.card-body ul li:nth-child(3)').textContent.includes('ADD BEEF'));
    assert.ok(this.element.querySelector('.card-body ul li:nth-child(3)').textContent.includes('VERY HOT'));
    assert.strictEqual(this.element.querySelector('.card-body ul li:nth-child(4)').textContent.trim(), '1 x 82 Steamed Rice');
  });

  test('printing small receipt', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('printOrder', function(orderId, orderType, receiptType) {
      assert.strictEqual(orderId, '1');
      assert.strictEqual(orderType, 'order/eat-out');
      assert.strictEqual(receiptType, 'EAT_IN');
    });

    await render(hbs`<OrderCard @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    await click('.row button.dropdown-toggle');
    await click('.row .dropdown-menu button:nth-child(1)');
    assert.expect(3);
  });

  test('printing large receipt', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('printOrder', function(orderId, orderType, receiptType) {
      assert.strictEqual(orderId, '1');
      assert.strictEqual(orderType, 'order/eat-out');
      assert.strictEqual(receiptType, 'DELIVERY');
    });

    await render(hbs`<OrderCard @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    await click('.row button.dropdown-toggle');
    await click('.row .dropdown-menu button:nth-child(2)');
    assert.expect(3);
  });

  test('updating payment info failure', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('printOrder', function() {});
    this.server.patch('/order/eat-outs/:id', 500);

    await render(hbs`<OrderCard @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £26.85');

    await click('[test-id="order-card-payment-info"]');
    await click('[test-id="order-card-payment-info"] + div.dropdown-menu button:nth-child(2)');

    const uiService = this.owner.lookup('service:ui');
    assert.strictEqual(uiService.message, 'Failed to update payment method');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £26.85');
  });

  test('updating payment info', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('printOrder', function() {});
    this.server.patch('/order/eat-outs/:id', 'order/eatOuts');

    await render(hbs`<OrderCard @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £26.85');

    await click('[test-id="order-card-payment-info"]');
    await click('[test-id="order-card-payment-info"] + div.dropdown-menu button:nth-child(2)');

    const uiService = this.owner.lookup('service:ui');
    assert.strictEqual(uiService.message, 'Updated payment method');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CASH £26.85');
  });

  function mockOrderItem(quantity, menuItem, editOptions) {
    return { quantity, menuItem, editOptions };
  }

  function mockMenuItem(menuId, name, price) {
    return {
      menuId: menuId,
      name,
      description: '',
      price,
      emphasisOnPrint: false,
      categories: [],
      editCategories: []
    };
  }

  function mockEditOption(name, price) {
    return { editCategoryId: 'editCategoryId', name, price };
  }

});
