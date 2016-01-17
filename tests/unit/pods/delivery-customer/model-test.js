import { moduleForModel, test } from 'ember-qunit';

moduleForModel('delivery-customer', 'Unit | Model | delivery customer', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('address one only', function(assert) {
  let model = this.subject({ addressOne: 'addressOne' });
  let address;

  Ember.run(function() {
    address = model.get('address');
  })

  assert.equal(address, 'addressOne');
});

test('address two only', function(assert) {
  let model = this.subject({ addressTwo: 'addressTwo' });
  let address;

  Ember.run(function() {
    address = model.get('address');
  })

  assert.equal(address, 'addressTwo');
});

test('address one and two', function(assert) {
  let model = this.subject({
    addressOne: 'addressOne',
    addressTwo: 'addressTwo'
  });

  let address;

  Ember.run(function() {
    address = model.get('address');
  })

  assert.equal(address, 'addressOne addressTwo');
});
