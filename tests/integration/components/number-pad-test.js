import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | number-pad', function(hooks) {
  setupRenderingTest(hooks);

  test('renders 12 buttons', async function(assert) {
    this.set('onChange', function() {});

    await render(hbs`<NumberPad @onChange={{this.onChange}}/>`);

    let btns = this.element.querySelectorAll('button');
    assert.strictEqual(btns.length, 12, 'twelve buttons in DOM');
  });

  test('pressing button updates value', async function(assert) {
    this.set('value', '');
    this.set('onChange', (value) => this.set('value', value));

    await render(hbs`<NumberPad @onChange={{this.onChange}} @value={{this.value}}/>`);

    await click(this.element.querySelectorAll('button')[0]);
    assert.strictEqual(this.get('value'), '1', 'value updated');
    assert.strictEqual(this.element.querySelector('div.text-center').textContent.trim(), '1', 'DOM updated');
  });

  test('max length of 4', async function(assert) {
    this.set('value', '');
    this.set('onChange', (value) => this.set('value', value));

    await render(hbs`<NumberPad @onChange={{this.onChange}} @value={{this.value}}/>`);

    let btns = this.element.querySelectorAll('button');
    await click(btns[0]);
    await click(btns[1]);
    await click(btns[2]);
    await click(btns[3]);
    await click(btns[4]);
    assert.strictEqual(this.get('value'), '1234', 'respects max length');
    assert.strictEqual(this.element.querySelector('div.text-center').textContent.trim(), '1234', 'DOM updated');
  });

  test('backspace does nothing when value is empty', async function(assert) {
    this.set('value', '');
    this.set('onChange', (value) => this.set('value', value));

    await render(hbs`<NumberPad @onChange={{this.onChange}} @value={{this.value}}/>`);

    await click(this.element.querySelectorAll('button')[9]);

    assert.strictEqual(this.get('value'), '', 'value is empty string');
    assert.strictEqual(this.element.querySelector('div.text-center').textContent.trim(), '', 'DOM is empty');
  });

  test('clear does nothing when value is empty', async function(assert) {
    this.set('value', '');
    this.set('onChange', (value) => this.set('value', value));

    await render(hbs`<NumberPad @onChange={{this.onChange}} @value={{this.value}}/>`);

    await click(this.element.querySelectorAll('button')[11]);

    assert.strictEqual(this.get('value'), '', 'value is empty string');
    assert.strictEqual(this.element.querySelector('div.text-center').textContent.trim(), '', 'DOM is empty');
  });

  test('backspace removes one character', async function(assert) {
    this.set('value', '1234');
    this.set('onChange', (value) => this.set('value', value));

    await render(hbs`<NumberPad @onChange={{this.onChange}} @value={{this.value}}/>`);
    assert.strictEqual(this.element.querySelector('div.text-center').textContent.trim(), '1234', 'initial DOM is 1234');

    await click(this.element.querySelectorAll('button')[9]);

    assert.strictEqual(this.get('value'), '123', 'one character removed');
    assert.strictEqual(this.element.querySelector('div.text-center').textContent.trim(), '123', 'DOM updated');
  });

  test('clear removes all', async function(assert) {
    this.set('value', '123');
    this.set('onChange', (value) => this.set('value', value));

    await render(hbs`<NumberPad @onChange={{this.onChange}} @value={{this.value}}/>`);
    assert.strictEqual(this.element.querySelector('div.text-center').textContent.trim(), '123', 'initial DOM is 123');

    await click(this.element.querySelectorAll('button')[11]);

    assert.strictEqual(this.get('value'), '', 'value is cleared');
    assert.strictEqual(this.element.querySelector('div.text-center').textContent.trim(), '', 'DOM is cleared');
  });
});
