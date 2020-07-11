import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | not', function(hooks) {
  setupRenderingTest(hooks);

  test('boolean values', async function(assert) {
    await render(hbs`{{not false}} {{not true}} {{not false false}} {{not false true}} {{not true false}} {{not true true}}`);
    assert.equal(this.element.textContent.trim(), 'true false true false false false');
  });

  test('integer values', async function(assert) {
    await render(hbs`{{not 0}} {{not 1}} {{not 0 0}} {{not 0 1}} {{not 1 0}} {{not 1 1}}`);
    assert.equal(this.element.textContent.trim(), 'true false true false false false');
  });

  test('string values', async function(assert) {
    await render(hbs`{{not ""}} {{not " "}} {{not "" ""}} {{not "" " "}} {{not " " ""}} {{not " " " "}}`);
    assert.equal(this.element.textContent.trim(), 'true false true false false false');
  });

  test('array values', async function(assert) {
    this.set('emptyArr', []);
    this.set('nonEmptyArr', ['non-empty']);
    await render(hbs`{{not this.emptyArr}} {{not this.nonEmptyArr}} {{not this.emptyArr this.emptyArr}} {{not this.emptyArr this.nonEmptyArr}} {{not this.nonEmptyArr this.emptyArr}} {{not this.nonEmptyArr this.nonEmptyArr}}`);
    assert.equal(this.element.textContent.trim(), 'true false true false false false');
  });

});
