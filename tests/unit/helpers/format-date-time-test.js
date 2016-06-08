import { formatDateTime } from '../../../helpers/format-date-time';
import { module, test } from 'qunit';

module('Unit | Helper | format date time');

test('format date time with null', function(assert) {
  let result = formatDateTime([null]);
  assert.strictEqual(result, '');
});

test('format date time with empty string', function(assert) {
  let result = formatDateTime(['']);
  assert.strictEqual(result, '');
});

test('format date time with undefined', function(assert) {
  let a;
  let result = formatDateTime([a]);
  assert.strictEqual(result, '');
});

test('format date time with string date', function(assert) {
  let result = formatDateTime(['Sat Sep 12 1992 00:00:00 GMT+0000 (GMT)']);
  assert.strictEqual(result, '01:00 - 12/9/1992');
});

test('format date time with Date object', function(assert) {
  let date = new Date('Sat Sep 12 1992 00:00:00 GMT+0000 (GMT)');
  let result = formatDateTime([date]);
  assert.strictEqual(result, '01:00 - 12/9/1992');
});
