import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('order-item', 'Integration | Component | order item', {
  integration: true
});


test('displays the item with menu id', function(assert) {
  this.set('item', EmberObject.create({
    total: 1234,
    quantity: 2,
    menuItem: EmberObject.create({
      menuId: 3,
      name: 'Menu item name'
    })
  }));

  this.render(hbs`{{order-item item=item}}`);
  this.$('.order-item').click();

  assert.equal(this.$('.order-item strong').text().trim(), '2 x 3');
  assert.ok(this.$('.order-item').text().trim().includes('Menu item name'));
  assert.ok(this.$('.order-item_expanded-content').text().trim().includes('12.34'));
});


test('does not display menu id if it doesnt exist', function(assert) {
  this.set('item', EmberObject.create({
    total: 1234,
    quantity: 2,
    menuItem: EmberObject.create({
      name: 'Menu item name'
    })
  }));

  this.render(hbs`{{order-item item=item}}`);
  this.$('.order-item').click();

  assert.equal(this.$('.order-item strong').text().trim(), '2 x');
  assert.ok(this.$('.order-item').text().trim().includes('Menu item name'));
  assert.ok(this.$('.order-item_expanded-content').text().trim().includes('12.34'));
});


test('displays edit options', function(assert) {
  this.set('item', EmberObject.create({
    total: 1234,
    quantity: 2,
    menuItem: EmberObject.create({
      name: 'Menu item name'
    }),
    editOptions: A([
      EmberObject.create({
        name: 'Edit option name',
        price: 2345
      })
    ])
  }));

  this.render(hbs`{{order-item item=item}}`);
  this.$('.order-item').click();

  assert.equal(this.$('.order-item strong').text().trim(), '2 x');
  assert.ok(this.$('.order-item').text().trim().includes('Menu item name'));
  assert.ok(this.$('.order-item_expanded-content').text().trim().includes('12.34'));
  assert.equal(this.$('.order-item_edit-option').text().trim(), 'Edit option name (23.45)');
});


test('toggles expanded to true when clicked', function(assert) {

  this.render(hbs`{{order-item}}`);
  this.$('.order-item').click();

  assert.equal(this.$('.order-item_expanded-content').length, 1);
});


test('toggles expanded to false when clicked', function(assert) {

  this.render(hbs`{{order-item}}`);
  this.$('.order-item').click();
  this.$('.order-item').click();

  return wait().then(() => {
    assert.equal(this.$('.order-item_expanded-content').length, 0);
  });
});
