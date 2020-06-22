import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { splitByNewline } from './../../util';

const DECREMENT_SELECTOR = 'button:nth-child(1)';
const EDIT_SELECTOR = 'button:nth-child(2)';
const INCREMENT_SELECTOR = 'button:nth-child(3)';

module('Integration | Component | order-item', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function() {
    this.server.db.emptyData();
    let editCategory = this.server.create('edit-category', { name: 'edit category' });
    this.server.create('menu-item', mockMenuItem('', 'menu item with no id', 10, []));
    this.server.create('menu-item', mockMenuItem('1', 'menu item one', 20, []));
    this.server.create('menu-item', mockMenuItem('2', 'menu item with edit category', 30, [editCategory]));
    this.server.get('/menu-items/:id');
  });

  test('order item with no menu id', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 1, { include: 'categories,editCategories' });
    this.set('item', store.createRecord('order-item', { quantity: 1, menuItem, editOptions: [] }));

    await render(hbs`<OrderItem @item={{this.item}}/>`);

    let text = splitByNewline(this.element.querySelector('.list-group-item > div').textContent);
    assert.strictEqual(text[0], '1 x menu item with no id');
    assert.strictEqual(text[1], '£0.10');
  });

  test('order item with menu id', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 2, { include: 'categories,editCategories' });
    this.set('item', store.createRecord('order-item', { quantity: 1, menuItem, editOptions: [] }));

    await render(hbs`<OrderItem @item={{this.item}}/>`);

    let text = splitByNewline(this.element.querySelector('.list-group-item > div').textContent);
    assert.strictEqual(text[0], '1 x 1 menu item one');
    assert.strictEqual(text[1], '£0.20');
  });

  test('order item with edit options', async function(assert) {
    this.server.create('edit-option', { editCategoryId: '1', name: 'edit option 1', price: 50 });
    this.server.create('edit-option', { editCategoryId: '1', name: 'edit option 2', price: 0 });
    this.server.create('edit-option', { editCategoryId: '1', name: 'edit option 3', price: 123 });
    this.server.get('/edit-options/:id');

    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 2, { include: 'categories,editCategories' });
    let editOptionOne = await store.findRecord('edit-option', 1);
    let editOptionTwo = await store.findRecord('edit-option', 2);
    let editOptionThree = await store.findRecord('edit-option', 3);
    this.set('item', store.createRecord('order-item', {
      quantity: 1,
      menuItem,
      editOptions: [editOptionOne, editOptionTwo, editOptionThree]
    }));

    await render(hbs`<OrderItem @item={{this.item}}/>`);

    let orderItemText = splitByNewline(this.element.querySelector('.list-group-item > div').textContent);
    assert.strictEqual(orderItemText[0], '1 x 1 menu item one');
    assert.strictEqual(orderItemText[1], '£1.93');
    assert.strictEqual(this.element.querySelectorAll('.list-group-item > div.text-muted').length, 3);
    assert.strictEqual(this.element.querySelector('.list-group-item > div:nth-child(2)').textContent.trim(), 'edit option 1 (0.50)');
    assert.strictEqual(this.element.querySelector('.list-group-item > div:nth-child(3)').textContent.trim(), 'edit option 2');
    assert.strictEqual(this.element.querySelector('.list-group-item > div:nth-child(4)').textContent.trim(), 'edit option 3 (1.23)');
  });

  test('clicking expands component', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 2, { include: 'categories,editCategories' });
    this.set('item', store.createRecord('order-item', { quantity: 1, menuItem, editOptions: [] }));

    await render(hbs`<OrderItem @item={{this.item}}/>`);
    await click('.list-group-item');

    assert.strictEqual(this.element.querySelectorAll('button').length, 2);
  });

  test('edit button shows only if menu item has edit categories', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItemWithEditCategories = await store.findRecord('menu-item', 3, { include: 'categories,editCategories' });
    this.set('item', store.createRecord('order-item', { quantity: 1, menuItem: menuItemWithEditCategories, editOptions: [] }));

    await render(hbs`<OrderItem @item={{this.item}}/>`);
    await click('.list-group-item');

    assert.strictEqual(this.element.querySelectorAll('button').length, 3);
  });

  test('clicking on increment, decrement, edit, does not toggle expanded', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItemWithEditCategories = await store.findRecord('menu-item', 3, { include: 'categories,editCategories' });
    this.set('item', store.createRecord('order-item', { quantity: 1, menuItem: menuItemWithEditCategories, editOptions: [] }));
    this.set('editOptions', []);
    this.set('onDecrement', function() {});

    await render(hbs`<div id="app-modal-container"></div>
                     <OrderItem @item={{this.item}} @editOptions={{this.editOptions}} @onDecrement={{this.onDecrement}}/>`);

    await click('.list-group-item');
    await click(DECREMENT_SELECTOR);
    await click(EDIT_SELECTOR);
    await click(INCREMENT_SELECTOR);

    assert.strictEqual(this.element.querySelectorAll('.list-group-item button').length, 3);
  });

  test('clicking edit shows edit modal', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItemWithEditCategories = await store.findRecord('menu-item', 3, { include: 'categories,editCategories' });
    this.set('item', store.createRecord('order-item', { quantity: 1, menuItem: menuItemWithEditCategories, editOptions: [] }));
    this.set('editOptions', []);
    this.set('onDecrement', function() {});

    await render(hbs`<div id="app-modal-container"></div>
                     <OrderItem @item={{this.item}} @editOptions={{this.editOptions}} @onDecrement={{this.onDecrement}}/>`);

    await click('.list-group-item');
    await click(EDIT_SELECTOR);

    assert.ok(this.element.querySelector('.modal'));
  });

  test('incrementing quantity', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItemWithEditCategories = await store.findRecord('menu-item', 3, { include: 'categories,editCategories' });
    this.set('item', store.createRecord('order-item', { quantity: 1, menuItem: menuItemWithEditCategories, editOptions: [] }));
    this.set('onDecrement', function() {});

    await render(hbs`<OrderItem @item={{this.item}} @onDecrement={{this.onDecrement}}/>`);
    await click('.list-group-item');
    await click(INCREMENT_SELECTOR);

    assert.strictEqual(this.element.querySelectorAll('button').length, 3);
  });

  test('decrementing quantity calls onDecrement arg', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItemWithEditCategories = await store.findRecord('menu-item', 3, { include: 'categories,editCategories' });
    let orderItem = store.createRecord('order-item', { quantity: 1, menuItem: menuItemWithEditCategories, editOptions: [] });
    this.set('item', orderItem);
    this.set('onDecrement', function(actualOrderItem) {
      assert.strictEqual(actualOrderItem, orderItem);
    });

    await render(hbs`<OrderItem @item={{this.item}} @onDecrement={{this.onDecrement}}/>`);
    await click('.list-group-item');
    await click(DECREMENT_SELECTOR);

    assert.expect(1);
  });

  function mockMenuItem(menuId, name, price, editCategories) {
    return {
      menuId,
      name,
      description: '',
      price,
      emphasisOnPrint: false,
      categories: [],
      editCategories
    };
  }
});
