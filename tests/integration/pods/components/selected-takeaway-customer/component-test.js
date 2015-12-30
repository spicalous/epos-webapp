import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('/selected-takeaway-customer', 'Integration | Component | selected takeaway customer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{selected-takeaway-customer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#selected-takeaway-customer}}
      template block text
    {{/selected-takeaway-customer}}
  `);

  assert.equal(this.$().text().trim(), '');
});
