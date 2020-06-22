import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form/select', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('options', ['10', '15', '20', '25', '30']);
    this.set('selectedValue', '10');
    this.set('onChange', (event) => { this.set('selectedValue', event.target.value); });
  });

  test('it renders', async function(assert) {
    await render(hbs`<Form::Select @options={{this.options}} @selectedValue={{this.selectedValue}} @onChange={{this.onChange}} />`);

    assert.strictEqual(this.element.querySelectorAll('option').length, 5);
    assert.strictEqual(this.element.querySelector('option:checked').textContent.trim(), '10');
  });

  test('selecting an option', async function(assert) {
    await render(hbs`<Form::Select @options={{this.options}} @selectedValue={{this.selectedValue}} @onChange={{this.onChange}} />`);

    await fillIn('select', '20');

    assert.strictEqual(this.get('selectedValue'), '20');
    assert.strictEqual(this.element.querySelector('option:checked').textContent.trim(), '20');
  });
});
