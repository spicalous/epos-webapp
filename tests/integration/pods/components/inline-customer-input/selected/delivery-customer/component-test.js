import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inline-customer-input/selected/delivery-customer', 'Integration | Component | inline customer input/selected/delivery customer', {
  integration: true
});

test('it renders', function(assert) {

  this.set('customer', {
    telephone: '01234567890',
    address: 'ADDRESS LINE',
    postcode: 'AB12 CD3'
  });

  this.render(hbs`{{inline-customer-input/selected/delivery-customer customer=customer}}`);

  assert.equal(this.$('div:eq(1)').text().trim(), 'ADDRESS LINE');
  assert.equal(this.$('div:eq(2)').text().trim(), 'AB12 CD3');
  assert.equal(this.$('div:eq(3)').text().trim(), '01234567890');
});
