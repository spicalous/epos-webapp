import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal/base/body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Modal::Base::Body />`);

    assert.ok(this.element.querySelector('.modal-body'));
    assert.strictEqual(this.element.textContent.trim(), '');

    await render(hbs`<Modal::Base::Body>
                       template block text
                     </Modal::Base::Body>`);

    assert.ok(this.element.querySelector('.modal-body'));
    assert.strictEqual(this.element.textContent.trim(), 'template block text');
  });
});
