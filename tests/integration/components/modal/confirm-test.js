import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal/confirm', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Modal::Confirm @title="confirm title" @body="confirm body"/>`);

    assert.strictEqual(this.element.querySelector('.modal-title').textContent.trim(), 'confirm title');
    assert.strictEqual(this.element.querySelector('.modal-body').textContent.trim(), 'confirm body');
    assert.strictEqual(this.element.querySelector('.modal-footer button:nth-child(1)').textContent.trim(), 'Cancel');
    assert.strictEqual(this.element.querySelector('.modal-footer button:nth-child(2)').textContent.trim(), 'Confirm');
    assert.strictEqual(this.element.querySelectorAll('.modal-footer button').length, 2);
  });

  test('clicking close icon runs dismiss callback', async function(assert) {
    this.set('onDismiss', () => assert.ok('onDismiss callback run'));

    await render(hbs`<Modal::Confirm @title="confirm title"
                                     @body="confirm body"
                                     @onDismiss={{this.onDismiss}}/>`);
    await click('button.close');
    assert.expect(1);
  });

  test('clicking cancel runs dismiss callback', async function(assert) {
    this.set('onDismiss', () => assert.ok('onDismiss callback run'));

    await render(hbs`<Modal::Confirm @title="confirm title"
                                     @body="confirm body"
                                     @onDismiss={{this.onDismiss}}/>`);
    await click('button.btn-main-secondary');
    assert.expect(1);
  });

  test('clicking confirm runs confirm callback', async function(assert) {
    this.set('onConfirm', () => assert.ok('onConfirm callback run'));

    await render(hbs`<Modal::Confirm @title="confirm title"
                                     @body="confirm body"
                                     @onConfirm={{this.onConfirm}}/>`);
    await click('button.btn-primary');
    assert.expect(1);
  });

  test('supports optional overriding of button class and text', async function(assert) {
    this.set('onConfirm', () => assert.ok('onConfirm callback run'));

    await render(hbs`<Modal::Confirm @title="confirm title"
                                     @body="confirm body"
                                     @btnClass="a-btn-class"
                                     @btnText="Button text"
                                     @onConfirm={{this.onConfirm}}/>`);

    assert.strictEqual(this.element.querySelector('.modal-footer button:nth-child(2)').textContent.trim(), 'Button text');
    assert.ok(this.element.querySelector('.modal-footer button:nth-child(2)').classList.contains('a-btn-class'));
  });

});
