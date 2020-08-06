import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal/create-eat-in', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function(assert) {
    this.set('onDismiss', () => assert.step('on dismiss'));
    this.set('onCreateOrder', () => assert.step('on create'));
  });

  test('create button is disabled if table name is empty', async function(assert) {
    await render(hbs`<Modal::CreateEatIn @onDismiss={{this.onDismiss}}
                                         @onCreateOrder={{this.onCreateOrder}}/>`);

    await fillIn('.modal input', '');
    assert.ok(this.element.querySelector('.modal-footer .btn-secondary'));
    assert.notOk(this.element.querySelector('.modal-footer .btn-success'));

    await fillIn('.modal input', 'Table 1');
    assert.notOk(this.element.querySelector('.modal-footer .btn-secondary'));
    assert.ok(this.element.querySelector('.modal-footer .btn-success'));
  });

  test('dismissing calls onDismiss', async function(assert) {
    await render(hbs`<Modal::CreateEatIn @onDismiss={{this.onDismiss}}
                                         @onCreateOrder={{this.onCreateOrder}}/>`);

    await click('.modal-footer .btn-main-secondary');

    assert.verifySteps(['on dismiss']);
  });

  test('confirming calls onCreateOrder', async function(assert) {
    await render(hbs`<Modal::CreateEatIn @onDismiss={{this.onDismiss}}
                                         @onCreateOrder={{this.onCreateOrder}}/>`);

    await click('.modal-footer .btn-success');
    assert.verifySteps(['on create']);
  });

});
