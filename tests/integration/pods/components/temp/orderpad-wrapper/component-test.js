import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('temp/orderpad-wrapper', 'Integration | Component | temp/orderpad wrapper', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{temp/orderpad-wrapper}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#temp/orderpad-wrapper}}
      template block text
    {{/temp/orderpad-wrapper}}
  `);

  assert.equal(this.$().text().trim(), '');
});
