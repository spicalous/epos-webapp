import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { validate } from './../../../models/delivery-customer-tag';

module('Unit | Model | delivery customer tag', function(hooks) {
  setupTest(hooks);

  test('name required', function(assert) {
    assert.strictEqual(validate(null), 'Tag name required.');
    assert.strictEqual(validate(undefined), 'Tag name required.');
    assert.strictEqual(validate(''), 'Tag name required.');
  });

  test('name cannot exceed 100 characters', function(assert) {
    assert.strictEqual(validate('12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901'), 'Tag name too long.');
  });

  test('does not allow all special characters', function(assert) {
    assert.strictEqual(validate('Tag name :,~'), 'Can only contain letters, numbers and ".-+*£%".');
  });

  test('allows certain special characters', function(assert) {
    assert.strictEqual(validate('Tag name .-+*£%'), '');
  });

});
