import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('orderpad-modal', 'Integration | Component | orderpad modal', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{orderpad-modal}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#orderpad-modal}}
      template block text
    {{/orderpad-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
