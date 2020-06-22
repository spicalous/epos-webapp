import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

const WIDE_SCREEN_EDIT_OPTION_BTNS = '.modal-body .container-fluid.d-none.d-lg-block .btn-group-vertical button';
const NARROW_SCREEN_EDIT_OPTION_BTNS_SELECTED = WIDE_SCREEN_EDIT_OPTION_BTNS + '.btn-success';
const NARROW_SCREEN_EDIT_OPTION_BTNS = '.modal-body .container-fluid.d-lg-none .btn-group-vertical button';

module('Integration | Component | modal/edit-order-item-dialog', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function() {
    this.server.db.emptyData();
    this.server.loadFixtures('editCategories', 'editOptions');
    let editCategories = this.server.schema.editCategories.all().models;
    this.server.get('/menu-items/:id');
    this.server.create('menu-item', {
      menuId: '1',
      name: 'menu item name',
      description: '',
      price: 42,
      emphasisOnPrint: false,
      categories: [],
      editCategories: [editCategories[0], editCategories[1], editCategories[2]]
    });
    let store = this.owner.lookup('service:store');
    this.set('editOptions', await store.findAll('edit-option'));
    this.set('emptyFn', function() {});
  });

  test('shows edit options based on menu item edit categories', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 1, { include: 'categories,editCategories' });
    this.set('item', store.createRecord('order-item', { quantity: 1, menuItem, editOptions: [] }));

    await render(hbs`<Modal::EditOrderItemDialog @item={{this.item}}
                                                 @editOptions={{this.editOptions}}
                                                 @onDismiss={{this.emptyFn}}/>`);

    assert.equal(this.element.querySelector('.modal-title').textContent.trim(), 'menu item name');
    // narrow screen display
    assert.equal(this.element.querySelectorAll('.modal-body .container-fluid.d-lg-none .btn-group button').length, 3);
    assert.equal(this.element.querySelectorAll(NARROW_SCREEN_EDIT_OPTION_BTNS).length, 10);
    // large screen display
    assert.equal(this.element.querySelectorAll(WIDE_SCREEN_EDIT_OPTION_BTNS).length, 62);
  });

  test('clicking close runs dismiss callback', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 1, { include: 'categories,editCategories' });
    this.set('item', store.createRecord('order-item', { quantity: 1, menuItem, editOptions: [] }));
    this.set('onDismiss', () => assert.ok('callback called', 'on dismiss callback called'));

    await render(hbs`<Modal::EditOrderItemDialog @item={{this.item}}
                                                 @editOptions={{this.editOptions}}
                                                 @onDismiss={{this.onDismiss}}/>`);

    await click('.modal-footer button');

    assert.expect(1);
  });

  test('adding edit options to order item', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 1, { include: 'categories,editCategories' });
    let orderItem = store.createRecord('order-item', { quantity: 1, menuItem, editOptions: [] });
    this.set('item', orderItem);

    await render(hbs`<Modal::EditOrderItemDialog @item={{this.item}}
                                                 @editOptions={{this.editOptions}}
                                                 @onDismiss={{this.emptyFn}}/>`);

    await click(WIDE_SCREEN_EDIT_OPTION_BTNS + ':nth-child(1)');

    assert.strictEqual(this.element.querySelectorAll(NARROW_SCREEN_EDIT_OPTION_BTNS_SELECTED).length, 1);
    assert.strictEqual(orderItem.editOptions.length, 1);
  });

  test('removing edit options from order item', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 1, { include: 'categories,editCategories' });
    let orderItem = store.createRecord('order-item', { quantity: 1, menuItem, editOptions: [] });
    this.set('item', orderItem);

    await render(hbs`<Modal::EditOrderItemDialog @item={{this.item}}
                                                 @editOptions={{this.editOptions}}
                                                 @onDismiss={{this.emptyFn}}/>`);

    await click(WIDE_SCREEN_EDIT_OPTION_BTNS + ':nth-child(1)');
    await click(WIDE_SCREEN_EDIT_OPTION_BTNS + ':nth-child(3)');
    assert.strictEqual(this.element.querySelectorAll(NARROW_SCREEN_EDIT_OPTION_BTNS_SELECTED).length, 2);
    assert.strictEqual(orderItem.editOptions.length, 2);

    await click(WIDE_SCREEN_EDIT_OPTION_BTNS + ':nth-child(1)');
    assert.strictEqual(this.element.querySelectorAll(NARROW_SCREEN_EDIT_OPTION_BTNS_SELECTED).length, 1);
    assert.strictEqual(orderItem.editOptions.length, 1);
  });
});
