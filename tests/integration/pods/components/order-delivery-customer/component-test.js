import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('order-delivery-customer', 'Integration | Component | order delivery customer', {
  integration: true,

  beforeEach: function() {
    this.inject.service('store', { as: 'store' });
  }
});

test('it renders', function(assert) {

  Ember.run(() => {
    this.set('delivery-customer',
      this.store.createRecord('delivery-customer', {
        telephone: '12345678901',
        addressOne: 'address one',
        addressTwo: 'address two',
        postcode: 'postcode'
      })
    );
  });

  this.render(hbs`{{order-delivery-customer customer=delivery-customer}}`);

  assert.equal(this.$().text().trim(), 'address one address two\npostcode 12345678901');
});
