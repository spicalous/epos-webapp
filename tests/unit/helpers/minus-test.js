import { minus } from '../../../helpers/minus';
import { module, test } from 'qunit';

module('Unit | Helper | minus');

test('minus', function(assert) {
  let result = minus([2, 1]);
  assert.strictEqual(result, 1);
});
