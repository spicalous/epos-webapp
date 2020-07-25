import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { arrayEquals } from './../../../util/array';

module('Unit | Util | array', function(hooks) {
  setupTest(hooks);

  test('arrayEquals', function(assert) {
    assert.strictEqual(arrayEquals([1, 2, 3], [1, 2, 3]), true);
    assert.strictEqual(arrayEquals(['1', '2', '3'], ['1', '2', '3']), true);
    assert.strictEqual(arrayEquals([1, 2, 3], [2, 1, 3]), true);
    assert.strictEqual(arrayEquals(['1', '2', '3'], ['2', '1', '3']), true);

    assert.strictEqual(arrayEquals([1, 2, 3], [1, 3]), false);
    assert.strictEqual(arrayEquals([1, 2, 3], ['1', '2', '3']), false);
  });
});
