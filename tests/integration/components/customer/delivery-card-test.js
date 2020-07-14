import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { UIStub, splitByNewline } from './../../../util';

module('Integration | Component | customer/delivery-card', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:ui', UIStub);
  });

  test('it renders', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/delivery', { telephone: 'telephone', addressOne: 'address one', road: 'road', postcode: 'postcode' }));

    await render(hbs`<Customer::DeliveryCard @customer={{this.customer}} />`);

    let text = splitByNewline(this.element.querySelector('.card-body p').textContent);
    assert.strictEqual(text[0], 'telephone');
    assert.strictEqual(text[1], 'address one');
    assert.strictEqual(text[2], 'road');
    assert.strictEqual(text[3], 'postcode');
  });

  test('clicking delete shows ui confirm with onDelete argument', async function(assert) {
    this.set('onDeleteCallback', () => { assert.step('delete callback'); });
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/delivery', { telephone: 'telephone', addressOne: 'address one', road: 'road', postcode: 'postcode' }));

    await render(hbs`<Customer::DeliveryCard @customer={{this.customer}} @onDelete={{this.onDeleteCallback}} />`);
    await click('.btn-danger');

    const stubUI = this.owner.lookup('service:ui');
    assert.strictEqual(stubUI.title, 'Delete customer');
    assert.strictEqual(stubUI.message, 'Are you sure you want to delete this customer?');
    assert.strictEqual(stubUI.btnClass, 'btn-danger');
    assert.strictEqual(stubUI.btnText, 'Delete');
    stubUI.callback();
    assert.verifySteps(['delete callback']);
  });
});
