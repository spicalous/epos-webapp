import { formatTime } from '../../../helpers/format-time';
import { module, test } from 'qunit';

module('Unit | Helper | format time');

test('format time with null', function(assert) {
  let result = formatTime([null]);
  assert.strictEqual(result, '');
});

test('format time with empty string', function(assert) {
  let result = formatTime(['']);
  assert.strictEqual(result, '');
});

test('format time with undefined', function(assert) {
  let a;
  let result = formatTime([a]);
  assert.strictEqual(result, '');
});

test('format time with string date', function(assert) {
  let result = formatTime(['Sat Sep 12 1992 00:00:00 GMT+0000 (GMT)']);
  assert.strictEqual(result, '01:00');
});

test('format time with Date object', function(assert) {
  let date = new Date('Sat Sep 12 1992 00:00:00 GMT+0000 (GMT)');
  let result = formatTime([date]);
  assert.strictEqual(result, '01:00');
});
