import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inline-customer-input/selected/online-customer', 'Integration | Component | inline customer input/selected/online customer', {
  integration: true
});

test('it focuses the input when focus is set to true', function(assert) {

  this.render(hbs`{{inline-customer-input/selected/online-customer focus=true}}`);

  assert.equal(this.$('input').is(":focus"), true);
});

test('it does not focus the input when focus is not set', function(assert) {

  this.render(hbs`{{inline-customer-input/selected/online-customer}}`);

  assert.equal(this.$('input').is(":focus"), false);
});
