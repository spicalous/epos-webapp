import { formatCurrency } from '../../../helpers/format-currency';
import { module, test } from 'qunit';

module('Unit | Helper | format currency');

test('format currency with null', function(assert) {
  let result = formatCurrency([null]);
  assert.strictEqual(result, "0.00");
});

test('format currency with a whole number', function(assert) {
  let result = formatCurrency([1234]);
  assert.strictEqual(result, "12.34");
});

test('format currency with a whole number string', function(assert) {
  let result = formatCurrency(['1234']);
  assert.strictEqual(result, "12.34");
});

test('format currency with a decimal', function(assert) {
  let result = formatCurrency([1234.5]);
  assert.strictEqual(result, "12.35");
});
