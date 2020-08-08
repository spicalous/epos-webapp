import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal/apply-order-modifier', function(hooks) {
  setupRenderingTest(hooks);

  function assertValid(assert, element, expectedToBeValid) {
    if (expectedToBeValid) {
      assert[expectedToBeValid ? 'notOk' : 'ok'](element.querySelector('.modal-footer .btn-secondary'));
      assert[expectedToBeValid ? 'ok' : 'notOk'](element.querySelector('.modal-footer .btn-primary'));
    }
  }

  hooks.beforeEach(async function(assert) {
    this.set('onDismiss', () => assert.step('on dismiss'));
    this.set('onApplyOrderModifier', (type, value) => assert.step(`${type} ${value}`));
  });

  test('it renders', async function(assert) {
    await render(hbs`<Modal::ApplyOrderModifier @onDismiss={{this.onDismiss}}
                                                @onApplyOrderModifier={{this.onApplyOrderModifier}}/>`);

    assert.strictEqual(this.element.querySelector('.modal-body button:nth-child(1)').textContent.trim(), '%');
    assert.strictEqual(this.element.querySelector('.modal-body button:nth-child(2)').textContent.trim(), '£');
    assertValid(assert, this.element, false);
  });

  test('percent validation', async function(assert) {
    await render(hbs`<Modal::ApplyOrderModifier @onDismiss={{this.onDismiss}}
                                                @onApplyOrderModifier={{this.onApplyOrderModifier}}/>`);

    assertValid(assert, this.element, false);

    for (const input of ['a', '0', '.', '0.1', '0.01']) {
      await fillIn('input', input);
      assertValid(assert, this.element, false);
    }

    await fillIn('input', '1');
    assertValid(assert, this.element, true);
    await fillIn('input', '100');
    assertValid(assert, this.element, true);
  });

  test('absolute validation', async function(assert) {
    await render(hbs`<Modal::ApplyOrderModifier @onDismiss={{this.onDismiss}}
                                                @onApplyOrderModifier={{this.onApplyOrderModifier}}/>`);

    await click('.modal-body button:nth-child(2)');
    assertValid(assert, this.element, false);

    for (const input of ['a', '0', '.', '0.']) {
      await fillIn('input', input);
      assertValid(assert, this.element, false);
    }

    for (const input of ['1', '1.', '1.1', '1.10', '100']) {
      await fillIn('input', input);
      assertValid(assert, this.element, true);
    }
  });

  test('dismissing dialog', async function(assert) {
    await render(hbs`<Modal::ApplyOrderModifier @onDismiss={{this.onDismiss}}
                                                @onApplyOrderModifier={{this.onApplyOrderModifier}}/>`);
    await click('.modal-footer .btn-main-secondary');
    assert.verifySteps(['on dismiss']);
  });

  test('applying dialog', async function(assert) {
    await render(hbs`<Modal::ApplyOrderModifier @onDismiss={{this.onDismiss}}
                                                @onApplyOrderModifier={{this.onApplyOrderModifier}}/>`);

    await fillIn('input', '50');
    await click('.modal-footer .btn-primary');
    assert.verifySteps(['PERCENT 50']);
  });

});
