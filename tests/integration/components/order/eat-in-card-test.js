import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { UIStub, splitByNewline } from 'epos-webapp/tests/util';

const OPTIONS = { include: 'orderItems.menuItem,orderItems.editOptions' };

module('Integration | Component | order/eat-in-card', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  function mockEditOption(name, price) {
    return { editCategoryId: 'editCategoryId', name, price };
  }

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
  hooks.beforeEach(async function() {
    this.owner.register('service:ui', UIStub);
    this.server.db.emptyData();
    let addBeef = this.server.create('edit-option', mockEditOption('ADD BEEF', 150));
    let veryHot = this.server.create('edit-option', mockEditOption('VERY HOT', 0));
    let spicyPC = this.server.create('menu-item', mockMenuItem('', 'Spicy PC', 280));
    let beefMassaman = this.server.create('menu-item', mockMenuItem('34BF', 'BEEF Massaman', 1050));
    let steamedRice = this.server.create('menu-item', mockMenuItem('82', 'Steamed Rice', 300));
    let orderItem1 = this.server.create('order-item', mockOrderItem(1, spicyPC, []));
    let orderItem2 = this.server.create('order-item', mockOrderItem(1, beefMassaman, [addBeef, veryHot]));
    let orderItem3 = this.server.create('order-item', mockOrderItem(1, steamedRice, []));
    this.server.create('order/eat-in', {
      dateTime: '2020-07-31T12:34:45.000Z',
      tableId: 'TABLEID',
      tableName: 'Table name',
      numberOfGuests: 4,
      notes: 'Order note',
      paymentMethod: 'CASH',
      orderItems: [orderItem1, orderItem2, orderItem3]
    });
    this.server.get('/order/eat-ins/:id', (schema, request) => schema['order/eatIns'].find(request.params.id));
    this.set('emptyFn', function() {});
  });

  test('formats date time', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-in', 1, OPTIONS));
    await render(hbs`<Order::EatInCard @order={{this.order}} @onPrintOrder={{this.emptyFn}}/>`);
    assert.ok(/^2020\/07\/31 - [01][0-9]:34$/.test(this.element.querySelector('.card-body > div small').textContent));
  });

  test('eat in info', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-in', 1, OPTIONS));

    await render(hbs`<Order::EatInCard @order={{this.order}} @onPrintOrder={{this.emptyFn}}/>`);

    let texts = splitByNewline(this.element.querySelector('.card-body .flex-fill > div').textContent);
    assert.strictEqual(texts.length, 3);
    assert.strictEqual(texts[0], 'Table name');
    assert.strictEqual(texts[1], '4');
    assert.strictEqual(texts[2], 'ID: TABLEID');
  });

  test('formats payment type', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-in', 1, OPTIONS));

    await render(hbs`<Order::EatInCard @order={{this.order}} @onPrintOrder={{this.emptyFn}}/>`);

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CASH £17.80');
  });

  test('showing order details', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-in', 1, OPTIONS));

    await render(hbs`<Order::EatInCard @order={{this.order}} @onPrintOrder={{this.emptyFn}}/>`);

    await click('button.btn-block');

    assert.strictEqual(this.element.querySelector('.card-body > [test-id="order-list-item-notes"]').textContent, 'Order note');
    assert.strictEqual(this.element.querySelectorAll('.card-body ul li').length, 3);
    assert.strictEqual(this.element.querySelector('.card-body ul li:nth-child(1)').textContent.trim(), '1 x  Spicy PC');
    assert.strictEqual(this.element.querySelectorAll('.card-body ul li:nth-child(2) div').length, 2);
    assert.ok(this.element.querySelector('.card-body ul li:nth-child(2)').textContent.includes('1 x 34BF BEEF Massaman'));
    assert.ok(this.element.querySelector('.card-body ul li:nth-child(2)').textContent.includes('ADD BEEF'));
    assert.ok(this.element.querySelector('.card-body ul li:nth-child(2)').textContent.includes('VERY HOT'));
    assert.strictEqual(this.element.querySelector('.card-body ul li:nth-child(3)').textContent.trim(), '1 x 82 Steamed Rice');
  });

  test('printing small receipt', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-in', 1, OPTIONS));
    this.set('printOrder', function(orderId, orderType, receiptType) {
      assert.strictEqual(orderId, '1');
      assert.strictEqual(orderType, 'order/eat-in');
      assert.strictEqual(receiptType, 'EAT_IN');
    });

    await render(hbs`<Order::EatInCard @order={{this.order}} @onPrintOrder={{this.printOrder}}/>`);

    await click('.row button.dropdown-toggle');
    await click('.row .dropdown-menu button:nth-child(1)');
    assert.expect(3);
  });

  test('printing large receipt', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-in', 1, OPTIONS));
    this.set('printOrder', function(orderId, orderType, receiptType) {
      assert.strictEqual(orderId, '1');
      assert.strictEqual(orderType, 'order/eat-in');
      assert.strictEqual(receiptType, 'DELIVERY');
    });

    await render(hbs`<Order::EatInCard @order={{this.order}} @onPrintOrder={{this.printOrder}}/>`);

    await click('.row button.dropdown-toggle');
    await click('.row .dropdown-menu button:nth-child(2)');
    assert.expect(3);
  });

  test('updating payment info failure', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-in', 1, OPTIONS));
    this.server.patch('/order/eat-ins/:id', 500);

    await render(hbs`<Order::EatInCard @order={{this.order}} @onPrintOrder={{this.emptyFn}}/>`);

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CASH £17.80');

    await click('[test-id="order-card-payment-info"]');
    await click('[test-id="order-card-payment-info"] + div.dropdown-menu button:nth-child(3)');

    const uiService = this.owner.lookup('service:ui');
    assert.strictEqual(uiService.message, 'Failed to update payment method');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CASH £17.80');
  });

  test('updating payment info', async function(assert) {
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-in', 1, OPTIONS));
    this.server.patch('/order/eat-ins/:id', 'order/eatIns');

    await render(hbs`<Order::EatInCard @order={{this.order}} @onPrintOrder={{this.emptyFn}}/>`);

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CASH £17.80');

    await click('[test-id="order-card-payment-info"]');
    await click('[test-id="order-card-payment-info"] + div.dropdown-menu button:nth-child(3)');

    const uiService = this.owner.lookup('service:ui');
    assert.strictEqual(uiService.message, 'Updated payment method');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CARD £17.80');
  });
});
