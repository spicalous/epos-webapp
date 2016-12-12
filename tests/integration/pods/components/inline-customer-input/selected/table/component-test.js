import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inline-customer-input/selected/table', 'Integration | Component | inline customer input/selected/table', {
  integration: true
});

test('it renders', function(assert) {
  this.set('table', { tableId: 1 });

  this.render(hbs`{{inline-customer-input/selected/table customer=table}}`);

  assert.equal(this.$().text().trim(), 'TABLE 1');
});
