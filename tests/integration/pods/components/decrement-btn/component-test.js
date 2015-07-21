import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('decrement-btn', 'Integration | Component | decrement btn', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{decrement-btn}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#decrement-btn}}
      template block text
    {{/decrement-btn}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
