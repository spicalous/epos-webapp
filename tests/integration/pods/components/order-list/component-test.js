import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('order-list', 'Integration | Component | order list', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{order-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#order-list}}
      template block text
    {{/order-list}}
  `);

  assert.equal(this.$().text().trim(), '');
});
