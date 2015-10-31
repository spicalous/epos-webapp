import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('takeaway-customer', 'Integration | Component | takeaway customer', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{takeaway-customer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#takeaway-customer}}
      template block text
    {{/takeaway-customer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
