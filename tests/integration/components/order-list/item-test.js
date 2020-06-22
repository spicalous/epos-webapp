import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

const OPTIONS = { include: 'orderItems.menuItem,orderItems.editOptions,customer' };

module('Integration | Component | order-list/item', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function() {
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

    await render(hbs`<OrderList::Item @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    assert.strictEqual(this.element.querySelector('.card-body > div small').textContent, '2016/03/09 - 12:34');
  });

  test('customer data', async function(assert) {
    let delivery = this.owner.lookup('service:store').createRecord('customer/delivery', {
      telephone: 'telephone',
      addressOne: 'address one',
      road: 'road',
      postcode: 'postcode'
    });
    let takeAway = this.owner.lookup('service:store').createRecord('customer/take-away', {
      telephone: 'telephone',
      name: 'name'
    });
    let online = this.owner.lookup('service:store').createRecord('customer/online', {
      orderId: 'orderId'
    });

    this.set('printOrder', function() {});
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('order.customer', null);

    await render(hbs`<OrderList::Item @order={{order}} @onPrintOrder={{this.printOrder}}/>`);
    assert.ok(this.element.querySelector('.card-body > div .icon-customer-unknown'));

    this.set('order.customer', delivery);
    assert.ok(this.element.querySelector('.card-body > div .icon-customer-delivery'));

    this.set('order.customer', takeAway);
    assert.ok(this.element.querySelector('.card-body > div .icon-customer-take-away'));

    this.set('order.customer', online);
    assert.ok(this.element.querySelector('.card-body > div .icon-customer-online'));
  });

  test('formats null payment type', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('printOrder', function() {});

    await render(hbs`<OrderList::Item @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    assert.strictEqual(this.element.querySelector('.card-body > [test-id="order-list-item-payment-info"]').textContent.trim(), 'NOT PAID £26.85');
  });

  test('formats non null payment type', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 2, OPTIONS));
    this.set('printOrder', function() {});

    await render(hbs`<OrderList::Item @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    assert.strictEqual(this.element.querySelector('.card-body > [test-id="order-list-item-payment-info"]').textContent.trim(), 'CASH £26.85');
  });

  test('showing order details', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('printOrder', function() {});

    await render(hbs`<OrderList::Item @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

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

    await render(hbs`<OrderList::Item @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    await click('button.btn-block');
    await click('button.dropdown-toggle');
    await click('.dropdown-menu button:nth-child(1)');
    assert.expect(3);
  });

  test('printing large receipt', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1, OPTIONS));
    this.set('printOrder', function(orderId, orderType, receiptType) {
      assert.strictEqual(orderId, '1');
      assert.strictEqual(orderType, 'order/eat-out');
      assert.strictEqual(receiptType, 'DELIVERY');
    });

    await render(hbs`<OrderList::Item @order={{order}} @onPrintOrder={{this.printOrder}}/>`);

    await click('button.btn-block');
    await click('button.dropdown-toggle');
    await click('.dropdown-menu button:nth-child(2)');
    assert.expect(3);
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
