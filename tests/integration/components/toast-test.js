import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | toast', function(hooks) {
  setupRenderingTest(hooks);

  test('shows toast', async function(assert) {
    this.set('toastModel', { message: 'toast message' });
    this.set('removeFromDOM', function() {});

    await render(hbs`<Toast @model={{this.toastModel}} @removeFromDOM={{this.removeFromDOM}}/>`);

    assert.equal(this.element.querySelector('.toast-body > span').textContent.trim(), 'toast message');
  });

  test('calls removeFromDOM args function', async function(assert) {
    this.set('toastModel', { message: 'toast message' });
    this.set('removeFromDOM', function() { assert.step('removeFromDOM'); });

    await render(hbs`<Toast @model={{this.toastModel}} @removeFromDOM={{this.removeFromDOM}}/>`);

    assert.verifySteps(['removeFromDOM']);
  });

});
