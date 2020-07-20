import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | customer/delivery-tag', function(hooks) {
  setupRenderingTest(hooks);

  test('displays badge name and badge class based on tag colour', async function(assert) {
    this.set('tag', this.owner.lookup('service:store').createRecord('delivery-customer-tag', { name: 'tag name', colour: 'blue' }));

    await render(hbs`<Customer::DeliveryTag @tag={{this.tag}}/>`);

    assert.ok(this.element.querySelector('span').textContent.trim(), 'tag name');
    this.set('tag.colour', 'blue');
    assert.ok(this.element.querySelector('.badge-primary'));
    this.set('tag.colour', 'grey');
    assert.ok(this.element.querySelector('.badge-secondary'));
    this.set('tag.colour', 'green');
    assert.ok(this.element.querySelector('.badge-success'));
    this.set('tag.colour', 'red');
    assert.ok(this.element.querySelector('.badge-danger'));
    this.set('tag.colour', 'yellow');
    assert.ok(this.element.querySelector('.badge-warning'));
    this.set('tag.colour', 'teal');
    assert.ok(this.element.querySelector('.badge-info'));
    this.set('tag.colour', 'unknown');
    assert.ok(this.element.querySelector('.badge-dark'));
  });

  test('displays close icon if onDelete arg is passed', async function(assert) {
    this.set('tag', this.owner.lookup('service:store').createRecord('delivery-customer-tag', { name: 'tag name', colour: 'blue' }));
    this.set('onDelete', () => assert.step('onDelete action'));

    await render(hbs`<Customer::DeliveryTag @tag={{this.tag}} @onDelete={{this.onDelete}}/>`);
    assert.ok(this.element.querySelector('span span').textContent.trim(), '&times;');

    await click('span span');
    assert.verifySteps(['onDelete action']);
  });

  test('does not display close icon by default', async function(assert) {
    this.set('tag', this.owner.lookup('service:store').createRecord('delivery-customer-tag', { name: 'tag name', colour: 'blue' }));
    await render(hbs`<Customer::DeliveryTag @tag={{this.tag}}/>`);
    assert.notOk(this.element.querySelector('span span'));
  });
});
