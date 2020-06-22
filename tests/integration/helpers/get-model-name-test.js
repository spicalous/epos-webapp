import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | get-model-name', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('customer', await this.owner.lookup('service:store').createRecord('customer/take-away'));

    await render(hbs`{{get-model-name customer}}`);

    assert.equal(this.element.textContent.trim(), 'customer/take-away');
  });
});
