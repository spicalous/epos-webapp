import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal/base/footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Modal::Base::Footer />`);

    assert.ok(this.element.querySelector('.modal-footer'));
    assert.strictEqual(this.element.textContent.trim(), '');

    await render(hbs`<Modal::Base::Footer>
                       template block text
                     </Modal::Base::Footer>`);

    assert.ok(this.element.querySelector('.modal-footer'));
    assert.strictEqual(this.element.textContent.trim(), 'template block text');
  });
});
