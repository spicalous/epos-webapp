import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Model | order item', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function() {
    this.server.db.emptyData();
    this.server.create('menu-item', mockMenuItem(10));
    this.server.create('menu-item', mockMenuItem(20));
    this.server.create('edit-option', { editCategoryId: 'editCategoryId', name: 'editOptionName', price: 30 });
    this.server.create('edit-option', { editCategoryId: 'editCategoryId', name: 'editOptionName', price: 40 });
    this.server.get('/menu-items/:id');
    this.server.get('/edit-options/:id');
  });

  // Replace this with your real tests.
  test('isMenuItem returns true if id\'s match', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 1);
    let model = store.createRecord('order-item', { quantity: 1, menuItem, editOptions: [] });

    assert.ok(model.isMenuItem(menuItem));
  });

  test('isMenuItem returns false if id\'s do not match', async function(assert) {
    let store = this.owner.lookup('service:store');
    let firstMenuItem = await store.findRecord('menu-item', 1);
    let secondMenuItem = await store.findRecord('menu-item', 2);
    let model = store.createRecord('order-item', { quantity: 1, menuItem: firstMenuItem, editOptions: [] });

    assert.notOk(model.isMenuItem(secondMenuItem));
  });

  test('hasNoEditOptions returns true if array is empty', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 1);
    let model = store.createRecord('order-item', { quantity: 1, menuItem, editOptions: [] });

    assert.ok(model.hasNoEditOptions());
  });

  test('hasNoEditOptions returns false if array is not empty', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 1);
    let editOption = await store.findRecord('edit-option', 1);
    let model = store.createRecord('order-item', { quantity: 1, menuItem, editOptions: [editOption] });

    assert.notOk(model.hasNoEditOptions());
  });

  test('calculates total', async function(assert) {
    let store = this.owner.lookup('service:store');
    let menuItem = await store.findRecord('menu-item', 1);
    let editOptionOne = await store.findRecord('edit-option', 1);
    let editOptionTwo = await store.findRecord('edit-option', 2);
    let model = store.createRecord('order-item', { quantity: 2, menuItem, editOptions: [editOptionOne, editOptionTwo] });

    assert.strictEqual(model.total, 160);
  });

  function mockMenuItem(price) {
    return {
      menuId: 'menuItemMenuId',
      name: 'menuItemName',
      description: '',
      price,
      emphasisOnPrint: false,
      categories: [],
      editCategories: []
    };
  }

});
