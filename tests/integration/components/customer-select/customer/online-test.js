import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | customer-select/customer/online', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with no values', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/online'));

    await render(hbs`<CustomerSelect::Customer::Online @customer={{this.customer}}/>`);

    assert.equal(this.element.querySelector('input[placeholder="Order id"]').value, '');
  });

  test('it renders with values', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/online', { orderId: 'orderId' }));

    await render(hbs`<CustomerSelect::Customer::Online @customer={{this.customer}}/>`);

    assert.equal(this.element.querySelector('input[placeholder="Order id"]').value, 'orderId');
  });

  test('does not disable input by default', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/online', { orderId: 'orderId' }));

    await render(hbs`<CustomerSelect::Customer::Online @customer={{this.customer}}/>`);

    assert.notOk(this.element.querySelector('input[placeholder="Order id"]:disabled'));
  });

  test('disables input if @disabled={{true}}', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/online', { orderId: 'orderId' }));

    await render(hbs`<CustomerSelect::Customer::Online @customer={{this.customer}} @disabled={{true}}/>`);

    assert.ok(this.element.querySelector('input[placeholder="Order id"]:disabled'));
  });

  test('changing input value changes orderId', async function(assert) {
    let customer = this.owner.lookup('service:store').createRecord('customer/online', { orderId: 'orderId'});
    this.set('customer', customer);

    await render(hbs`<CustomerSelect::Customer::Online @customer={{this.customer}}/>`);

    await fillIn('input', 'orderId 42');

    assert.strictEqual(customer.orderId, 'orderId 42');
  });
});
