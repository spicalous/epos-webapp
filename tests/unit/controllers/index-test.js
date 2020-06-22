import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | index', function(hooks) {
  setupTest(hooks);

  test('saveSetting rolls back attributes when failing', function(assert) {
    let mockEmberRecord = {
      set: () => {},
      save: () => Promise.reject(),
      rollbackAttributes: () => {
        assert.ok('function called', 'rollbackAttributes was called');
      }
    };
    let controller = this.owner.lookup('controller:index');

    controller.send('saveSetting', mockEmberRecord, 42);

    assert.expect(1);
  });

});
