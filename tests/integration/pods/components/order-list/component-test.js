import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('order-item-list', 'Integration | Component | order item list', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{order-item-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#order-item-list}}
      template block text
    {{/order-item-list}}
  `);

  assert.equal(this.$().text().trim(), '');
});
