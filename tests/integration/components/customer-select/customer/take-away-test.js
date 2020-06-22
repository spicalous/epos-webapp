import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | customer-select/customer/take-away', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders no values', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/take-away'));

    await render(hbs`<CustomerSelect::Customer::TakeAway @customer={{this.customer}}/>`);

    assert.equal(this.element.querySelector('input[placeholder="Telephone"]').value, '');
    assert.equal(this.element.querySelector('input[placeholder="Name"]').value, '');
  });

  test('it renders with values', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/take-away', {
      telephone: '01234567890',
      name: 'customer name'
    }));

    await render(hbs`<CustomerSelect::Customer::TakeAway @customer={{this.customer}}/>`);

    assert.equal(this.element.querySelector('input[placeholder="Telephone"]').value, '01234567890');
    assert.equal(this.element.querySelector('input[placeholder="Name"]').value, 'customer name');
  });

  test('does not disable inputs by default', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/take-away'));

    await render(hbs`<CustomerSelect::Customer::TakeAway @customer={{this.customer}}/>`);

    assert.notOk(this.element.querySelector('input[placeholder="Telephone"]:disabled'));
    assert.notOk(this.element.querySelector('input[placeholder="Name"]:disabled'));
  });

  test('disables inputs if @disabled={{true}}', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/take-away'));

    await render(hbs`<CustomerSelect::Customer::TakeAway @customer={{this.customer}} @disabled={{true}}/>`);

    assert.ok(this.element.querySelector('input[placeholder="Telephone"]:disabled'));
    assert.ok(this.element.querySelector('input[placeholder="Name"]:disabled'));
  });

  test('validates on change', async function(assert) {
    let customer = this.owner.lookup('service:store').createRecord('customer/take-away');
    this.set('customer', customer);

    await render(hbs`<CustomerSelect::Customer::TakeAway @customer={{this.customer}}/>`);
    assert.notOk(this.element.querySelector('.invalid-feedback'));

    await fillIn('input[placeholder="Telephone"]', '42');

    assert.equal(this.element.querySelector('input[placeholder="Telephone"]').value, '42');
    assert.equal(this.element.querySelector('.invalid-feedback').textContent.trim(), 'Telephone number is too short.');
    assert.strictEqual(customer.telephone, '42');

    await fillIn('input[placeholder="Telephone"]', '424242424242');

    assert.equal(this.element.querySelector('input[placeholder="Telephone"]').value, '424242424242');
    assert.equal(this.element.querySelector('.invalid-feedback').textContent.trim(), 'Telephone number is too long.');
    assert.strictEqual(customer.telephone, '424242424242');

    await fillIn('input[placeholder="Telephone"]', '42424242424');

    assert.equal(this.element.querySelector('input[placeholder="Telephone"]').value, '42424242424');
    assert.notOk(this.element.querySelector('.invalid-feedback'));
    assert.strictEqual(customer.telephone, '42424242424');
  });
});
