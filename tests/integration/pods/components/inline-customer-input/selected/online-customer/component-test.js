import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inline-customer-input/selected/online-customer', 'Integration | Component | inline customer input/selected/online customer', {
  integration: true
});

test('it focuses the input', function(assert) {

  this.render(hbs`{{inline-customer-input/selected/online-customer}}`);

  assert.equal(this.$('input').is(":focus"), true);
});
