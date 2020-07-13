import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

class UIStub extends Service {

  showConfirm(title, message, callback, btnClass, btnText) {
    this.title = title;
    this.message = message;
    this.callback = callback;
    this.btnClass = btnClass;
    this.btnText = btnText;
  }

}

module('Integration | Component | button-with-confirm', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:ui', UIStub);
  });

  test('allows classes to be added to button element', async function(assert) {
    await render(hbs`<ButtonWithConfirm class="a-btn-class">
                       Button Text
                     </ButtonWithConfirm>`);

    const btn = this.element.querySelector('button');
    assert.ok(btn.classList.contains('btn'));
    assert.ok(btn.classList.contains('a-btn-class'));
    assert.equal(btn.textContent.trim(), 'Button Text');
  });

  test('clicking button calls ui service confirm modal', async function(assert) {
    this.set('confirmCallback', () => { assert.step('confirm callback'); });

    await render(hbs`<ButtonWithConfirm @confirmTitle="A title"
                                        @confirmMessage="A message"
                                        @onConfirm={{this.confirmCallback}}>
                       Button Text
                     </ButtonWithConfirm>`);

    await click('button');

    const uiService = this.owner.lookup('service:ui');
    assert.equal(uiService.title, 'A title');
    assert.equal(uiService.message, 'A message');
    uiService.callback();
    assert.verifySteps(['confirm callback']);
  });

  test('allows optional confirm button class and text', async function(assert) {
    this.set('confirmCallback', () => { assert.step('confirm callback'); });

    await render(hbs`<ButtonWithConfirm @confirmTitle="A title"
                                        @confirmMessage="A message"
                                        @confirmBtnClass="btn-danger"
                                        @confirmBtnText="Delete"
                                        @onConfirm={{this.confirmCallback}}>
                       Button Text
                     </ButtonWithConfirm>`);

    await click('button');

    const uiService = this.owner.lookup('service:ui');
    assert.equal(uiService.title, 'A title');
    assert.equal(uiService.message, 'A message');
    assert.equal(uiService.btnClass, 'btn-danger');
    assert.equal(uiService.btnText, 'Delete');
    uiService.callback();
    assert.verifySteps(['confirm callback']);
  });

});
