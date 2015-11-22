import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('delivery-customer-search-results', 'Integration | Component | delivery customer search results', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{delivery-customer-search-results}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#delivery-customer-search-results}}
      template block text
    {{/delivery-customer-search-results}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
