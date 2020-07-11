import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | and', function(hooks) {
  setupRenderingTest(hooks);

  test('boolean values', async function(assert) {
    await render(hbs`{{and false}} {{and true}} {{and false false}} {{and false true}} {{and true false}} {{and true true}}`);
    assert.equal(this.element.textContent.trim(), 'false true false false false true');
  });

  test('integer values', async function(assert) {
    await render(hbs`{{and 0}} {{and 1}} {{and 0 0}} {{and 0 1}} {{and 1 0}} {{and 1 1}}`);
    assert.equal(this.element.textContent.trim(), 'false true false false false true');
  });

  test('string values', async function(assert) {
    await render(hbs`{{and ""}} {{and " "}} {{and "" ""}} {{and "" " "}} {{and " " ""}} {{and " " " "}}`);
    assert.equal(this.element.textContent.trim(), 'false true false false false true');
  });

  test('array values', async function(assert) {
    this.set('emptyArr', []);
    this.set('nonEmptyArr', ['non-empty']);
    await render(hbs`{{and this.emptyArr}} {{and this.nonEmptyArr}} {{and this.emptyArr this.emptyArr}} {{and this.emptyArr this.nonEmptyArr}} {{and this.nonEmptyArr this.emptyArr}} {{and this.nonEmptyArr this.nonEmptyArr}}`);
    assert.equal(this.element.textContent.trim(), 'false true false false false true');
  });

});
