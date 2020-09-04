import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | show-hide-toggle', function(hooks) {
  setupRenderingTest(hooks);

  test('show is false by default', async function(assert) {
    await render(hbs`<ShowHideToggle as |showHideToggle|>
                       {{#if showHideToggle.show}}
                         TRUE
                       {{else}}
                         FALSE
                       {{/if}}
                     </ShowHideToggle>`);

    assert.strictEqual(this.element.textContent.trim(), 'FALSE');
  });

  test('allows providing initial value', async function(assert) {
    await render(hbs`<ShowHideToggle @initial={{true}} as |showHideToggle|>
                       {{#if showHideToggle.show}}
                         TRUE
                       {{else}}
                         FALSE
                       {{/if}}
                     </ShowHideToggle>`);

    assert.strictEqual(this.element.textContent.trim(), 'TRUE');
  });

  test('invoking action toggles property', async function(assert) {
    await render(hbs`<ShowHideToggle as |showHideToggle|>
                       <button type="button" {{on "click" showHideToggle.toggleShow}}>
                         Toggle
                       </button>
                       <div>
                         {{#if showHideToggle.show}}
                           TRUE
                         {{else}}
                           FALSE
                         {{/if}}
                       </div>
                     </ShowHideToggle>`);

    assert.strictEqual(this.element.querySelector('div').textContent.trim(), 'FALSE');
    await click('button');
    assert.strictEqual(this.element.querySelector('div').textContent.trim(), 'TRUE');
  });
});
