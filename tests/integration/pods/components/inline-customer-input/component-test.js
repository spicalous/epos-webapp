import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inline-customer-input', 'Integration | Component | inline customer input', {
  integration: true
});

test('displays select customer when no customer is selected', function(assert) {

  this.render(hbs`{{inline-customer-input}}`);

  assert.equal(this.$('button').text().trim(), 'SELECT CUSTOMER');
});

//test('displays remove customer when customer is selected', function(assert) {
//
//});
//
//test('displays takeaway customer information', function(assert) {
//
//});
//
//test('displays delivery customer information', function(assert) {
//
//});

//test('displays table customer information', function(assert) {
//
//});
