import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { validate } from './../../../../models/customer/delivery';

module('Unit | Model | customer/delivery', function(hooks) {
  setupTest(hooks);

  test('when all null', function(assert) {
    assert.strictEqual(validate(null, null, null, null), 'Telephone number required. Address required.');
    assert.strictEqual(validate(undefined, undefined, undefined, undefined), 'Telephone number required. Address required.');
  });

  test('telephone is validated', function(assert) {
    assert.strictEqual(validate('', 'any', 'any', 'any'), 'Telephone number required.');
    assert.strictEqual(validate('1', 'any', 'any', 'any'), 'Telephone number is too short.');
    assert.strictEqual(validate('123456789012', 'any', 'any', 'any'), 'Telephone number is too long.');
    assert.strictEqual(validate('12345678901', 'any', 'any', 'any'), '');
  });

  test('address is required', function(assert) {
    assert.strictEqual(validate('12345678901', null, null, ''), 'Address required.');
    assert.strictEqual(validate('12345678901', undefined, undefined, ''), 'Address required.');
    assert.strictEqual(validate('12345678901', '', '', ''), 'Address required.');
    assert.strictEqual(validate('12345678901', 'any', '', ''), '');
    assert.strictEqual(validate('12345678901', '', 'any', ''), '');
    assert.strictEqual(validate('12345678901', 'any', 'any', ''), '');
  });

  test('addressOne must not be more than 100 characters', function(assert) {
    assert.strictEqual(
      validate('12345678901', '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901', '', ''),
      'Address must not be more than 100 characters.');
  });

  test('addressOne must not be more than 100 characters', function(assert) {
    assert.strictEqual(
      validate('12345678901', '', '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901', ''),
      'Address must not be more than 100 characters.');
  });

  test('address formatting', function(assert) {
    let model = this.owner.lookup('service:store').createRecord('customer/delivery', {});
    model.addressOne = 'address one';
    model.road = '';
    assert.strictEqual(model.address, 'address one');
    model.addressOne = '';
    model.road = 'road';
    assert.strictEqual(model.address, 'road');
    model.addressOne = 'address one';
    model.road = 'road';
    assert.strictEqual(model.address, 'address one road');
  });

  test('empty postcode is valid', function(assert) {
    assert.strictEqual(validate('12345678901', 'any', 'any', ''), '');
  });

  test('any postcode is valid', function(assert) {
    assert.strictEqual(validate('12345678901', 'any', 'any', 'AB12 CD3'), '');
  });

  test('postcode must not exceed 10 characters', function(assert) {
    assert.strictEqual(validate('12345678901', 'any', 'any', '12345678901'), 'Postcode must not be more than 10 characters.');
  });

});
