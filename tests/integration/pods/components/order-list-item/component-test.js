import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('order-list-item', 'Integration | Component | order list item', {
  integration: true,

  beforeEach: function() {
    this.inject.service('store', { as: 'store' });
  }
});

test('it renders takeaway customer', function(assert) {

  Ember.run(() => {
    this.set('order', this.store.createRecord('order', {
      customer: this.store.createRecord('takeaway-customer')
    }));
  });

  this.render(hbs`{{order-list-item order=order}}`);

  assert.ok(this.$().text().includes('TAKE AWAY'));
});

test('it renders delivery customer', function(assert) {

  Ember.run(() => {
    this.set('order', this.store.createRecord('order', {
      customer: this.store.createRecord('delivery-customer', {
        telephone: '12345678901',
        addressOne: 'ADDRESS ONE',
        addressTwo: 'ADDRESS TWO',
        postcode: 'AB12 3CD'
      })
    }));
  });

  this.render(hbs`{{order-list-item order=order}}`);

  assert.ok(this.$().text().includes('ADDRESS ONE ADDRESS TWO'));
  assert.ok(this.$().text().includes('AB12 3CD 12345678901'));
});
