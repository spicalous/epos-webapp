import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | contains', function(hooks) {
  setupRenderingTest(hooks);

  test('primitive numbers true', async function(assert) {
    this.set('array', [1, 2, 3]);
    this.set('value', 1);
    await render(hbs`{{contains this.array this.value}}`);
    assert.strictEqual(this.element.textContent.trim(), 'true');
  });

  test('primitive numbers false', async function(assert) {
    this.set('array', [1, 2, 3]);
    this.set('value', 42);
    await render(hbs`{{contains this.array this.value}}`);
    assert.strictEqual(this.element.textContent.trim(), 'false');
  });

  test('primitive strings true', async function(assert) {
    this.set('array', ['a', 'b', 'c']);
    this.set('value', 'a');
    await render(hbs`{{contains this.array this.value}}`);
    assert.strictEqual(this.element.textContent.trim(), 'true');
  });

  test('primitive strings false', async function(assert) {
    this.set('array', ['a', 'b', 'c']);
    this.set('value', 'nope');
    await render(hbs`{{contains this.array this.value}}`);
    assert.strictEqual(this.element.textContent.trim(), 'false');
  });
});
