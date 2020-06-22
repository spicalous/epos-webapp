import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { validate } from './../../../models/customer';

module('Unit | Model | customer', function(hooks) {
  setupTest(hooks);

  test('telephone number required', function(assert) {
    assert.strictEqual(validate(null), 'Telephone number required.');
    assert.strictEqual(validate(undefined), 'Telephone number required.');
    assert.strictEqual(validate(''), 'Telephone number required.');
  });

  test('telephone number too short', function(assert) {
    assert.strictEqual(validate('1'), 'Telephone number is too short.');
  });

  test('telephone number too long', function(assert) {
    assert.strictEqual(validate('123456789012'), 'Telephone number is too long.');
  });

  test('valid telephone number', function(assert) {
    assert.strictEqual(validate('12345678901'), '');
  });

});
