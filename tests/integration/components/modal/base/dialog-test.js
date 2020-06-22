import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, getRootElement, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal/base/dialog', function(hooks) {
  setupRenderingTest(hooks);

  test('displays title, body, and footer', async function(assert) {
    await render(hbs`<Modal::Base::Dialog @title="This is the title" as |Body Footer|>
                       <Body>This is the body</Body>
                       <Footer>This is the footer</Footer>
                     </Modal::Base::Dialog>`);

    assert.strictEqual(this.element.querySelector('.modal-title').textContent.trim(), 'This is the title');
    assert.strictEqual(this.element.querySelector('.modal-body').textContent.trim(), 'This is the body');
    assert.strictEqual(this.element.querySelector('.modal-footer').textContent.trim(), 'This is the footer');
  });

  test('modal backdrop is appended to DOM, root element has modal-open class', async function(assert) {
    await render(hbs`<Modal::Base::Dialog />`);

    let rootElement = getRootElement();
    assert.ok(rootElement.getAttribute('class').includes('modal-open'));
    assert.ok(rootElement.querySelector('.modal-backdrop'));
  });

  test('adjustable size', async function(assert) {
    await render(hbs`<Modal::Base::Dialog @size="bootstrap-size-class"/>`);
    assert.ok(this.element.querySelector('.modal-dialog.bootstrap-size-class'));
  });

  test('clicking on cross closes the dialog', async function(assert) {
    await render(hbs`<Modal::Base::Dialog />`);
    assert.ok(this.element.querySelector('.modal.show'));

    await click('button.close');
    assert.notOk(this.element.querySelector('.modal.show'));
  });

  test('clicking outside closes the dialog', async function(assert) {
    await render(hbs`<Modal::Base::Dialog />`);
    assert.ok(this.element.querySelector('.modal.show'));

    await click('.modal.fade');
    assert.notOk(this.element.querySelector('.modal.show'));
  });

  test('runs onDismiss function when closing dialog', async function(assert) {
    this.set('onDismiss', () => assert.ok('callback called', 'on dismiss callback called'));

    await render(hbs`<Modal::Base::Dialog @onDismiss={{this.onDismiss}}/>`);
    assert.ok(this.element.querySelector('.modal.show'));

    await click('button.close');
    assert.notOk(this.element.querySelector('.modal.show'));
    assert.expect(3);
  });

  test('allows consumer to call yielded onDismiss function to close dialog', async function(assert) {
    this.set('onDismiss', () => assert.ok('callback called', 'on dismiss callback called'));

    await render(hbs`<Modal::Base::Dialog @title="This is the title"
                                          @onDismiss={{this.onDismiss}} as |Body Footer onDismiss|>
                       <Footer>
                         <button type="button" class="on-dismiss-test" {{on "click" onDismiss}}></button>
                       </Footer>
                     </Modal::Base::Dialog>`);

    assert.ok(this.element.querySelector('.modal.show'));

    await click('button.on-dismiss-test');
    assert.notOk(this.element.querySelector('.modal.show'));
    assert.expect(3);
  });

  test('allows consumer to call yielded onConfirm function to close dialog', async function(assert) {
    this.set('onConfirm', () => assert.ok('callback called', 'on confirm callback called'));

    await render(hbs`<Modal::Base::Dialog @title="This is the title"
                                          @onConfirm={{this.onConfirm}} as |Body Footer onDismiss onConfirm|>
                       <Footer>
                         <button type="button" class="on-confirm-test" {{on "click" onConfirm}}></button>
                       </Footer>
                     </Modal::Base::Dialog>`);

    assert.ok(this.element.querySelector('.modal.show'));

    await click('button.on-confirm-test');
    assert.notOk(this.element.querySelector('.modal.show'));
    assert.expect(3);
  });

  test('dialogs are closed in same order they are opened', async function(assert) {
    this.set('onDismissOne', function() { assert.step('dismiss one'); });
    this.set('onDismissTwo', function() { assert.step('dismiss two'); });

    await render(hbs`<Modal::Base::Dialog @title="Dialog 1"
                                          @onDismiss={{this.onDismissOne}} as |Body Footer onDismiss|>
                       <Footer>
                         <button type="button" class="dismiss-1" {{on "click" onDismiss}}></button>
                       </Footer>
                     </Modal::Base::Dialog>
                     <Modal::Base::Dialog @title="Dialog 2"
                                          @onDismiss={{this.onDismissTwo}} as |Body Footer onDismiss|>
                       <Footer>
                         <button type="button" class="dismiss-2" {{on "click" onDismiss}}></button>
                       </Footer>
                     </Modal::Base::Dialog>`);
    let modals = this.element.querySelectorAll('.modal');
    for (let i = modals.length - 1; i > -1; i--) {
      await click(modals[i]);
      if (i > 0) {
        assert.ok(this.element.classList.contains('modal-open'));
      } else {
        assert.notOk(this.element.classList.contains('modal-open'));
      }
    }

    assert.verifySteps(['dismiss two', 'dismiss one']);
  });

  test('attributes can be set on modal body', async function(assert) {
    await render(hbs`<Modal::Base::Dialog @title="This is the title" as |Body Footer|>
                       <Body class="my-body-class">
                         Modal body
                       </Body>
                     </Modal::Base::Dialog>`);

    assert.ok(this.element.querySelector('.modal-body.my-body-class'));
  });
});
