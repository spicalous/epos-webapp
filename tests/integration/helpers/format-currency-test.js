import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | format-currency', function(hooks) {
  setupRenderingTest(hooks);

  test('format currency with null', async function(assert) {
    this.set('value', null);
    await render(hbs`{{format-currency value}}`);
    assert.equal(this.element.textContent.trim(), '0.00');
  });

  test('format currency with whole number', async function(assert) {
    this.set('value', 1234);
    await render(hbs`{{format-currency value}}`);
    assert.equal(this.element.textContent.trim(), '12.34');
  });

  test('format currency with whole number string', async function(assert) {
    this.set('value', '1234');
    await render(hbs`{{format-currency value}}`);
    assert.equal(this.element.textContent.trim(), '12.34');
  });

  test('format currency with decimal', async function(assert) {
    this.set('value', 1234.5);
    await render(hbs`{{format-currency value}}`);
    assert.equal(this.element.textContent.trim(), '12.35');
  });
});
