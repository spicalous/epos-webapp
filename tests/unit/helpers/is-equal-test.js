import { isEqual } from '../../../helpers/is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | is equal');

test('equals', function(assert) {
  let result = isEqual([1, 1]);
  assert.ok(result);
});

test('not equals', function(assert) {
  let result = isEqual([2, 1]);
  assert.notOk(result);
});

test('not equals 2', function(assert) {
  let result = isEqual(['1', 1]);
  assert.notOk(result);
});
