
import { contains } from 'epos-webapp/helpers/contains';
import { module, test } from 'qunit';

module('Unit | Helper | contains');

test('contains for primitive numbers', function(assert) {
  let result = contains([[41, 42, 43], 42]);
  assert.ok(result);
});

