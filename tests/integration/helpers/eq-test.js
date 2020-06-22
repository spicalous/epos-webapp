import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | eq', function(hooks) {
  setupRenderingTest(hooks);

  test('primitive numbers', async function(assert) {
    await render(hbs`{{eq 1 1}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('not equal numbers', async function(assert) {
    await render(hbs`{{eq 1 2}}`);

    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('strings', async function(assert) {
    await render(hbs`{{eq "a" "a"}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('not equal strings', async function(assert) {
    await render(hbs`{{eq "a" "b"}}`);

    assert.equal(this.element.textContent.trim(), 'false');
  });
});
