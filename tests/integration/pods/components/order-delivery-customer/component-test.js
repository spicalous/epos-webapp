import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('order-delivery-customer', 'Integration | Component | order delivery customer', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{order-delivery-customer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#order-delivery-customer}}
      template block text
    {{/order-delivery-customer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
