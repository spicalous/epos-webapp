import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inline-customer-input/selected/takeaway-customer', 'Integration | Component | inline customer input/selected/takeaway customer', {
  integration: true
});

test('it renders', function(assert) {

  this.set('takeawayCustomer', { telephone: '01234567890', name: 'Customer Name' });

  this.render(hbs`{{inline-customer-input/selected/takeaway-customer customer=takeawayCustomer}}`);

  assert.equal(this.$('input:eq(0)').val().trim(), '01234567890');
  assert.equal(this.$('input:eq(1)').val().trim(), 'Customer Name');
});
