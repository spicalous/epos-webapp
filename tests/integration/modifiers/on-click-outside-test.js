import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | on-click-outside', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function(assert) {
    this.set('assertClicked', function() { assert.ok('clicked'); });
    await render(hbs`<div class="is-outside"></div>
                     <div class="is-element" {{on-click-outside this.assertClicked}}>
                       <div class="is-inside"></div>
                     </div>`);
  });

  test('invokes handler when clicking outside', async function(assert) {
    await click('.is-outside');
    assert.expect(1);
  });

  test('does not invoke handler when clicking on element', async function(assert) {
    await click('.is-element');
    assert.expect(0);
  });

  test('does not invoke handler when clicking inside element', async function(assert) {
    await click('.is-inside');
    assert.expect(0);
  });
});
