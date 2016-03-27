import { formatPaymentMethod } from '../../../helpers/format-payment-method';
import { module, test } from 'qunit';

module('Unit | Helper | format payment method');

test('format payment method with null', function(assert) {
  let result = formatPaymentMethod([null]);
  assert.strictEqual(result, 'NOT PAID');
});

test('format payment method with anything', function(assert) {
  let result = formatPaymentMethod(['any string']);
  assert.strictEqual(result, 'any string');
});
