import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('order-item', 'Integration | Component | order item', {
  integration: true
});


test('displays the item with menu id', function(assert) {
  this.set('item', Ember.Object.create({
    total: 1234,
    quantity: 2,
    menuItem: Ember.Object.create({
      menuId: 3,
      name: 'Menu item name'
    })
  }));

  this.render(hbs`{{order-item item=item}}`);

  assert.equal(this.$('.order-item__quantity-x-id').text().trim(), '2 x 3');
  assert.equal(this.$('.order-item__name').text().trim(), 'Menu item name');
  assert.equal(this.$('.order-item__total').text().trim(), '12.34');
});


test('does not display menu id if it doesnt exist', function(assert) {
  this.set('item', Ember.Object.create({
    total: 1234,
    quantity: 2,
    menuItem: Ember.Object.create({
      name: 'Menu item name'
    })
  }));

  this.render(hbs`{{order-item item=item}}`);

  assert.equal(this.$('.order-item__quantity-x-id').text().trim(), '2 x');
  assert.equal(this.$('.order-item__name').text().trim(), 'Menu item name');
  assert.equal(this.$('.order-item__total').text().trim(), '12.34');
});


test('displays edit options', function(assert) {
  this.set('item', Ember.Object.create({
    total: 1234,
    quantity: 2,
    menuItem: Ember.Object.create({
      name: 'Menu item name'
    }),
    editOptions: Ember.A([
      Ember.Object.create({
        name: 'Edit option name',
        price: 2345
      })
    ])
  }));

  this.render(hbs`{{order-item item=item}}`);

  assert.equal(this.$('.order-item__quantity-x-id').text().trim(), '2 x');
  assert.equal(this.$('.order-item__name').text().trim(), 'Menu item name');
  assert.equal(this.$('.order-item__total').text().trim(), '12.34');
  assert.equal(this.$('.order-item__edit-option').text().trim(), 'Edit option name (23.45)');
});


test('toggles expanded to true when clicked', function(assert) {

  this.render(hbs`{{order-item}}`);
  this.$('.order-item__top').click();

  assert.equal(this.$('.order-item__bottom').length, 1);
});


test('toggles expanded to false when clicked', function(assert) {

  this.render(hbs`{{order-item}}`);
  this.$('.order-item__top').click();
  this.$('.order-item__top').click();

  return wait().then(() => {
    assert.equal(this.$('.order-item__bottom').length, 0);
  });
});
