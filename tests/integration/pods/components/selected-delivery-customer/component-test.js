import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('/selected-delivery-customer', 'Integration | Component | selected delivery customer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{selected-delivery-customer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#selected-delivery-customer}}
      template block text
    {{/selected-delivery-customer}}
  `);

  assert.equal(this.$().text().trim(), '');
});
