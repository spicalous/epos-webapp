import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('customer-select', 'Integration | Component | customer select', {
  integration: true
});

test('it renders', function(assert) {

  assert.expect(0);
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('customer', {
    telephone: '12345678901',
    addressOne: 'addressOne',
    addressTwo: 'addressTwo',
    postcode: 'postcode'
  });

  this.render(hbs`{{customer-select customer=customer}}`);
});
