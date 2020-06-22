import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { validate } from './../../../../models/customer/online';

module('Unit | Model | customer/online', function(hooks) {
  setupTest(hooks);

  test('telephone number not required', function(assert) {
    assert.strictEqual(validate(null), '');
    assert.strictEqual(validate(undefined), '');
    assert.strictEqual(validate(''), '');
  });

  test('telephone follows same validation if present', function(assert) {
    assert.strictEqual(validate('1'), 'Telephone number is too short.');
    assert.strictEqual(validate('123456789012'), 'Telephone number is too long.');
    assert.strictEqual(validate('12345678901'), '');
  });
});
