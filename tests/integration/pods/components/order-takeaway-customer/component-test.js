import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('order-takeaway-customer', 'Integration | Component | order takeaway customer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{order-takeaway-customer}}`);

  assert.equal(this.$().text().trim(), 'TAKE AWAY');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#order-takeaway-customer}}
      template block text
    {{/order-takeaway-customer}}
  `);

  assert.equal(this.$().text().trim(), 'TAKE AWAY');
});
