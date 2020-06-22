import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { Response } from 'ember-cli-mirage';
import { splitByNewline } from './../../util';

module('Integration | Component | order-pad', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  const ICON_DELETE_SELECTOR = '.order-pad_right_customer .icon-delete-white';

  hooks.beforeEach(async function() {
    this.server.db.emptyData();
    this.server.loadFixtures();
    let store = this.owner.lookup('service:store');
    this.set('categories', await store.findAll('category'));
    this.set('menuItems', await store.findAll('menu-item', { include: 'categories,editCategories' }));
    this.set('editOptions', await store.findAll('edit-option'));
  });

  function assertOrderInfo(assert, element, expectedQuantityText, expectedTotalText) {
    assert.strictEqual(element.querySelector('.order-pad_right_info div').textContent.trim(), expectedQuantityText);
    assert.strictEqual(element.querySelector('.order-pad_right_info div:nth-child(2)').textContent.trim(), expectedTotalText);
  }

  test('renders categories and menu items', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));
    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    assert.strictEqual(this.element.querySelectorAll('.category-button').length, 18, 'correct number of categories');
    assert.strictEqual(this.element.querySelectorAll('.order-pad_left_bottom_menu .list-group-item').length, 354, 'correct number of menu items');
  });

  test('applies correct class to selected category', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));
    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    assert.strictEqual(this.element.querySelector('.category-button.btn-main'), null, 'no active buttons');

    await click('.category-button');

    assert.strictEqual(this.element.querySelectorAll('.category-button.btn-main').length, 1, 'one active buttons');
  });

  test('selecting category filters menu items', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));
    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    assert.strictEqual(this.element.querySelectorAll('.order-pad_left_bottom_menu .list-group-item').length, 354, 'initial number of menu items');

    await click('.category-button');

    assert.strictEqual(this.element.querySelectorAll('.order-pad_left_bottom_menu .list-group-item').length, 33, 'only item which belong to category are selected');
  });

  test('entering numpad filters menu items', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));
    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    assert.strictEqual(this.element.querySelectorAll('.order-pad_left_bottom_menu .list-group-item').length, 354, 'initial number of menu items');

    await click(this.element.querySelectorAll('.order-pad_left_bottom_numpad button')[0]);

    assert.strictEqual(this.element.querySelectorAll('.order-pad_left_bottom_menu .list-group-item').length, 22, 'only items which start with 1 displayed');
  });

  test('creating new take-away customer', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));
    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(1)');

    assert.ok(this.element.querySelector('.order-pad_right_customer input[placeholder="Telephone"]'), 'telephone input displayed');
    assert.ok(this.element.querySelector('.order-pad_right_customer input[placeholder="Name"]'), 'name input displayed');
  });

  test('cancelling delivery customer select', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));
    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(2)');

    await click('.delivery-select .btn-main-secondary');

    assert.ok('.order-pad_right_customer .dropdown > button');
  });

  test('creating new delivery customer', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));
    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(2)');
    await fillIn('input[placeholder="Telephone"]', '02011223344');
    await fillIn('input[placeholder="House no."]', '1');
    await fillIn('input[placeholder="Road"]', 'road one');
    await fillIn('input[placeholder="Postcode"]', 'postcode');
    await click('.delivery-select .btn-primary');

    let text = splitByNewline(this.element.querySelector('.order-pad_right_customer').textContent);
    assert.strictEqual(text[0], '02011223344');
    assert.strictEqual(text[1], '1 road one');
    assert.strictEqual(text[2], 'postcode');
  });

  test('saving new delivery customer fails', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));
    this.server.post('/customer/deliveries', () => {
      return new Response(500, {}, { errors: [{ detail: 'Error message for customer delivery save failure' }]});
    });

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(2)');
    await fillIn('input[placeholder="Telephone"]', '02011223344');
    await fillIn('input[placeholder="House no."]', '1');
    await fillIn('input[placeholder="Road"]', 'road one');
    await fillIn('input[placeholder="Postcode"]', 'postcode');
    await click('.delivery-select .btn-primary');

    assert.ok(this.owner.lookup('service:ui').appOverlayShown);
    assert.strictEqual(this.owner.lookup('service:ui').model.title, 'Failed to save customer :(');
    assert.strictEqual(this.owner.lookup('service:ui').model.message, 'Error message for customer delivery save failure');
  });

  test('selecting existing customer', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(2)');
    await fillIn('.delivery-select input', '020');
    await click('.delivery-select .list-group-item');

    let text = splitByNewline(this.element.querySelector('.order-pad_right_customer').textContent);
    assert.strictEqual(text[0], '02011111111');
    assert.strictEqual(text[1], '1 ONE ROAD');
    assert.strictEqual(text[2], 'AB1 2CD');
  });

  test('creating new online customer', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(3)');

    assert.ok(this.element.querySelector('.order-pad_right_customer input[placeholder="Order id"]'), 'order id input displayed');
  });

  test('displays remove customer button when order is new', async function(assert) {
    let store = this.owner.lookup('service:store');
    this.set('order', store.createRecord('order/eat-out', {
      customer: store.createRecord('customer/take-away')
    }));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}
                               @isNewOrder={{true}}/>`);

    assert.ok(this.element.querySelector(ICON_DELETE_SELECTOR));
    await click(ICON_DELETE_SELECTOR);

    assert.ok(this.element.querySelector('.order-pad_right_customer .dropdown > button'), 'customer select shown');
  });

  test('does not display remove customer button when order is not new', async function(assert) {
    let store = this.owner.lookup('service:store');
    this.set('order', store.createRecord('order/eat-out', {
      customer: store.createRecord('customer/take-away')
    }));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}
                               @isNewOrder={{false}}/>`);

    assert.notOk(this.element.querySelector(ICON_DELETE_SELECTOR));
  });

  test('adding menu item to order', async function(assert) {
    let store = this.owner.lookup('service:store');
    this.set('order', store.createRecord('order/eat-out', { orderItems: [] }));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');

    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 1);
    assertOrderInfo(assert, this.element, '1 item', '£42.00');
  });

  test('adding edit option to order item displays on order item list', async function(assert) {
    let store = this.owner.lookup('service:store');
    this.set('order', store.createRecord('order/eat-out', { orderItems: [] }));

    await render(hbs`<div id="app-modal-container"></div>
                     <OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @editOptions={{this.editOptions}}
                               @order={{this.order}}/>`);

    // add item
    await click('.order-pad_left_bottom_menu .list-group-item');
    let textBefore = splitByNewline(this.element.querySelector('.order-pad_right_items .list-group-item').textContent);
    assert.strictEqual(textBefore.length, 2);
    assertOrderInfo(assert, this.element, '1 item', '£42.00');

    // add edit order-item
    await click('.order-pad_right_items .list-group-item');
    await click('.order-pad_right_items .list-group-item button:nth-child(2)');
    await click('.modal-body .container-fluid.d-none.d-lg-block .btn-group-vertical button:nth-child(2)');
    await click('.modal-footer button');
    // stop editing
    await click('.order-pad_right_items .list-group-item');

    let text = splitByNewline(this.element.querySelector('.order-pad_right_items .list-group-item').textContent);
    assert.strictEqual(text.length, 3);
    assert.strictEqual(text[2], 'ADD CHICKEN (1.50)');
    assertOrderInfo(assert, this.element, '1 item', '£43.50');
  });

  test('adding duplicate menu item to order increments the quantity', async function(assert) {
    let store = this.owner.lookup('service:store');
    this.set('order', store.createRecord('order/eat-out', { orderItems: [] }));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    let beforeText = splitByNewline(this.element.querySelector('.order-pad_right_items .list-group-item').textContent);
    assert.strictEqual(beforeText[0], '1 x SET MENU A (2pp)');
    assertOrderInfo(assert, this.element, '1 item', '£42.00');

    await click('.order-pad_left_bottom_menu .list-group-item');
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 1);
    let text = splitByNewline(this.element.querySelector('.order-pad_right_items .list-group-item').textContent);
    assert.strictEqual(text[0], '2 x SET MENU A (2pp)');
    assertOrderInfo(assert, this.element, '2 items', '£84.00');
  });

  test('adding a duplicate menu item to order adds a new entry if existing menu item has edit options', async function(assert) {
    let store = this.owner.lookup('service:store');
    this.set('order', store.createRecord('order/eat-out', { orderItems: [] }));

    await render(hbs`<div id="app-modal-container"></div>
                     <OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @editOptions={{this.editOptions}}
                               @order={{this.order}}/>`);
    // add item
    await click('.order-pad_left_bottom_menu .list-group-item');
    // add edit order-item
    await click('.order-pad_right_items .list-group-item');
    await click('.order-pad_right_items .list-group-item button:nth-child(2)');
    await click('.modal-body .container-fluid.d-none.d-lg-block .btn-group-vertical button');
    await click('.modal-footer button');

    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 1);
    assertOrderInfo(assert, this.element, '1 item', '£42.00');

    // add item again
    await click('.order-pad_left_bottom_menu .list-group-item');

    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 2);
    assertOrderInfo(assert, this.element, '2 items', '£84.00');
  });

  test('displays order items', async function(assert) {
    let store = this.owner.lookup('service:store');
    this.set('order', store.createRecord('order/eat-out', {
      orderItems: [
        store.createRecord('order-item', { quantity: 1, menuItem: this.get('menuItems').objectAt(39), editOptions: [] }),
        store.createRecord('order-item', { quantity: 1, menuItem: this.get('menuItems').objectAt(46), editOptions: [] })
      ]
    }));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 2);
    assertOrderInfo(assert, this.element, '2 items', '£11.30');
  });

  test('decrementing order item when item is more than 1', async function(assert) {
    let store = this.owner.lookup('service:store');
    this.set('order', store.createRecord('order/eat-out', {
      orderItems: [store.createRecord('order-item', { quantity: 2, menuItem: this.get('menuItems').objectAt(39), editOptions: [] })]
    }));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);
    await click('.order-pad_right_items .list-group-item');
    await click('.order-pad_right_items .list-group-item button:nth-child(1)');

    let orderItemText = splitByNewline(this.element.querySelector('.order-pad_right_items .list-group-item > div').textContent);
    assert.strictEqual(orderItemText[0], '1 x 6 Corn Cakes');
    assert.strictEqual(orderItemText[1], '£5.65');
    assertOrderInfo(assert, this.element, '1 item', '£5.65');
  });

  test('removing item by decrementing', async function(assert) {
    let store = this.owner.lookup('service:store');
    this.set('order', store.createRecord('order/eat-out', {
      orderItems: [store.createRecord('order-item', { quantity: 1, menuItem: this.get('menuItems').objectAt(39), editOptions: [] })]
    }));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);
    await click('.order-pad_right_items .list-group-item');
    await click('.order-pad_right_items .list-group-item button:nth-child(1)');

    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_items .list-group-item').length, 0);
    assertOrderInfo(assert, this.element, '0 items', '£0.00');
  });

  test('empty customer and empty order items shows back button', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    assert.strictEqual(this.element.querySelector('.order-pad_right_actions button').textContent.trim(), 'Back', 'Back button displayed');
    assert.strictEqual(this.element.querySelectorAll('.order-pad_right_actions button').length, 1);
  });

  test('customer and empty order items shows cancel button and disabled submit', async function(assert) {
    let store = this.owner.lookup('service:store');
    this.set('order', store.createRecord('order/eat-out', { customer: store.createRecord('customer/take-away') }));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-danger').textContent.trim(), 'Cancel', 'Cancel button displayed');
    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-secondary:disabled').textContent.trim(), 'Submit', 'Submit button displayed');
  });

  test('empty customer and order items shows cancel button and disabled submit', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');

    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-danger').textContent.trim(), 'Cancel', 'Cancel button displayed');
    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-secondary:disabled').textContent.trim(), 'Submit', 'Submit button displayed');
  });

  test('invalid takeaway customer and order items shows cancel button and disabled submit', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}
                               @isNewOrder={{true}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(1)');
    await fillIn('.order-pad_right_customer input[placeholder="Telephone"]', '123');

    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-danger').textContent.trim(), 'Cancel', 'Cancel button displayed');
    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-secondary:disabled').textContent.trim(), 'Submit', 'Submit button displayed');
  });

  test('valid takeaway customer and order items shows cancel button and submit', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}
                               @isNewOrder={{true}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(1)');

    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-danger').textContent.trim(), 'Cancel', 'Cancel button displayed');
    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-success').textContent.trim(), 'Submit', 'Submit button displayed');
    assert.notOk(this.element.querySelector('.order-pad_right_actions .btn-secondary'), 'Submit button not disabled');

    await fillIn('.order-pad_right_customer input[placeholder="Telephone"]', '123');
    assert.ok(this.element.querySelector('.order-pad_right_actions .btn-secondary:disabled'), 'Submit button disabled');

    await fillIn('.order-pad_right_customer input[placeholder="Telephone"]', '12345678901');
    assert.notOk(this.element.querySelector('.order-pad_right_actions .btn-secondary'), 'Submit button not disabled');
  });

  test('valid delivery customer and order items shows cancel button and submit', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}
                               @isNewOrder={{true}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(2)');
    await fillIn('.delivery-select input', '020');
    await click('.delivery-select .list-group-item');

    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-danger').textContent.trim(), 'Cancel', 'Cancel button displayed');
    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-success').textContent.trim(), 'Submit', 'Submit button displayed');
    assert.notOk(this.element.querySelector('.order-pad_right_actions .btn-secondary'), 'Submit button not disabled');
  });

  test('valid online customer and order items shows cancel button and submit', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(3)');

    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-danger').textContent.trim(), 'Cancel', 'Cancel button displayed');
    assert.strictEqual(this.element.querySelector('.order-pad_right_actions .btn-success').textContent.trim(), 'Submit', 'Submit button displayed');
    assert.notOk(this.element.querySelector('.order-pad_right_actions .btn-secondary'), 'Submit button not disabled');
  });

  test('clicking submit shows order confirm modal', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<div id="app-modal-container"></div>
                     <OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(1)');
    await click('.order-pad_right_actions .btn-success');

    assert.strictEqual(this.element.querySelector('.modal .modal-title').textContent.trim(), 'Confirm order');
    assert.strictEqual(this.element.querySelectorAll('.modal .modal-body .list-group-item').length, 1);
    assert.strictEqual(
      this.element.querySelector('.modal .modal-footer .row:nth-child(1) > div:nth-child(1)').textContent.trim(),
      '1 item');
    assert.strictEqual(
      this.element.querySelector('.modal .modal-footer .row:nth-child(1) > div:nth-child(2)').textContent.trim(),
      '£42.00');
  });

  test('setting customer/take-away sets estimateTime to 30', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<div id="app-modal-container"></div>
                     <OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(1)');
    await click('.order-pad_right_actions .btn-success');

    assert.strictEqual(this.element.querySelector('.modal select:nth-child(1) option:checked').textContent.trim(), '30');
  });

  test('setting customer/online sets estimateTime to 15', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<div id="app-modal-container"></div>
                     <OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(3)');
    await click('.order-pad_right_actions .btn-success');

    assert.strictEqual(this.element.querySelector('.modal select:nth-child(1) option:checked').textContent.trim(), '15');
  });

  test('selecting estimateTime in confirm modal', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<div id="app-modal-container"></div>
                     <OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(3)');
    await click('.order-pad_right_actions .btn-success');
    await fillIn('.modal select', '25');

    assert.strictEqual(this.get('order.estimatedTime'), '25');
  });

  test('selecting paymentMethod in confirm modal', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<div id="app-modal-container"></div>
                     <OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(3)');
    await click('.order-pad_right_actions .btn-success');
    await fillIn('.modal div:nth-child(2) select', 'CASH');

    assert.strictEqual(this.get('order.paymentMethod'), 'CASH');
  });

  test('setting order notes', async function(assert) {
    this.set('order', this.owner.lookup('service:store').createRecord('order/eat-out'));

    await render(hbs`<div id="app-modal-container"></div>
                     <OrderPad @categories={{this.categories}}
                               @menuItems={{this.menuItems}}
                               @order={{this.order}}/>`);

    await click('.order-pad_left_bottom_menu .list-group-item');
    await click('.order-pad_right_customer .dropdown > button');
    await click('.order-pad_right_customer .dropdown > .dropdown-menu > button:nth-child(3)');
    await click('.order-pad_right_actions .btn-success');
    await fillIn('.modal textarea', 'this is an order note');

    assert.strictEqual(this.get('order.notes'), 'this is an order note');
  });

});
