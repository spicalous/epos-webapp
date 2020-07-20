import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | customer/delivery-tag-input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('name', '');
    this.set('colour', 'blue');
    this.set('onColour', (colour) => assert.step(colour));

    await render(hbs`<Customer::DeliveryTagInput @name={{this.name}} @colour={{this.colour}} @onColour={{this.onColour}}/>`);

    assert.ok(this.element.querySelector('input'));
    assert.strictEqual(this.element.querySelector('.dropdown-toggle span').textContent.trim(), 'blue');
    assert.strictEqual(this.element.querySelectorAll('.dropdown-item').length, 6);

    await render(hbs`
      <Customer::DeliveryTagInput @name={{this.name}} @colour={{this.colour}} @onColour={{this.onColour}}>
        <button type="button" class="my-button">
          My button
        </button>
      </Customer::DeliveryTagInput>`);

    assert.ok(this.element.querySelector('.my-button'));
  });

  test('updating name and colour', async function(assert) {
    this.set('name', '');
    this.set('colour', 'blue');
    this.set('onColour', (colour) => this.set('colour', colour));

    await render(hbs`<Customer::DeliveryTagInput @name={{this.name}} @colour={{this.colour}} @onColour={{this.onColour}}/>`);
    await fillIn('input', 'My new tag name');
    await click('.dropdown-toggle');
    await click('.dropdown-menu .dropdown-item:nth-child(3)');

    assert.strictEqual(this.get('name'), 'My new tag name');
    assert.strictEqual(this.get('colour'), 'green');
    assert.strictEqual(this.element.querySelector('.dropdown-toggle span').textContent.trim(), 'green');
  });

});
