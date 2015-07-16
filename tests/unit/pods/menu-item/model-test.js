import { moduleForModel, test } from 'ember-qunit';

moduleForModel('menu-item', 'Unit | Model | menu item', {
  needs: ['model:category']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
