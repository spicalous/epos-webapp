import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | format-payment-method', function(hooks) {
  setupRenderingTest(hooks);

  test('format payment method with null', async function(assert) {
    this.set('value', null);
    await render(hbs`{{format-payment-method value}}`);
    assert.equal(this.element.textContent.trim(), 'NOT PAID');
  });

  test('format payment method with anything', async function(assert) {
    this.set('value', 'any string');
    await render(hbs`{{format-payment-method value}}`);
    assert.equal(this.element.textContent.trim(), 'any string');
  });

});
