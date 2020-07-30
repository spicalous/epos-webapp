import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { splitByNewline } from 'epos-webapp/tests/util';

module('Integration | Component | customer-select/index', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('emptyFn', function() {});
  });

  test('No customer shows dropdown', async function(assert) {
    await render(hbs`<CustomerSelect @onTakeAwaySelected={{this.emptyFn}}
                                     @onDeliverySelected={{this.emptyFn}}
                                     @onOnlineSelected={{this.emptyFn}}
                                     @onRemoveCustomer={{this.emptyFn}}/>`);

    assert.equal(this.element.querySelector('.dropdown > button').textContent.trim(), 'New customer');
  });

  test('renders correct component for customer/take-away', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/take-away'));

    await render(hbs`<CustomerSelect @customer={{this.customer}}
                                     @onTakeAwaySelected={{this.emptyFn}}
                                     @onDeliverySelected={{this.emptyFn}}
                                     @onOnlineSelected={{this.emptyFn}}
                                     @onRemoveCustomer={{this.emptyFn}}/>`);

    assert.ok(this.element.querySelector('input[placeholder="Telephone"]'));
    assert.ok(this.element.querySelector('input[placeholder="Name"]'));
  });

  test('renders correct component for customer/delivery', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/delivery', {
      telephone: '12345678901',
      addressOne: 'address one',
      road: 'road',
      postcode: 'postcode'
    }));

    await render(hbs`<CustomerSelect @customer={{this.customer}}
                                     @onTakeAwaySelected={{this.emptyFn}}
                                     @onDeliverySelected={{this.emptyFn}}
                                     @onOnlineSelected={{this.emptyFn}}
                                     @onRemoveCustomer={{this.emptyFn}}/>`);

    let text = splitByNewline(this.element.querySelector('div .text-center').textContent);
    assert.strictEqual(text[0], '12345678901');
    assert.strictEqual(text[1], 'address one road');
    assert.strictEqual(text[2], 'postcode');
  });

  test('renders correct component for customer/online', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/online'));

    await render(hbs`<CustomerSelect @customer={{this.customer}}
                                     @onTakeAwaySelected={{this.emptyFn}}
                                     @onDeliverySelected={{this.emptyFn}}
                                     @onOnlineSelected={{this.emptyFn}}
                                     @onRemoveCustomer={{this.emptyFn}}/>`);

    assert.ok(this.element.querySelector('input[placeholder="Order id"]'));
  });

  test('does not show remove button when @isEditable is false', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/take-away'));

    await render(hbs`<CustomerSelect @customer={{this.customer}}
                                     @isEditable={{false}}
                                     @onTakeAwaySelected={{this.emptyFn}}
                                     @onDeliverySelected={{this.emptyFn}}
                                     @onOnlineSelected={{this.emptyFn}}
                                     @onRemoveCustomer={{this.emptyFn}}/>`);

    assert.notOk(this.element.querySelector('.icon-delete-white'));
  });

  test('shows remove button when @isEditable is true', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/take-away'));

    await render(hbs`<CustomerSelect @customer={{this.customer}}
                                     @isEditable={{true}}
                                     @onTakeAwaySelected={{this.emptyFn}}
                                     @onDeliverySelected={{this.emptyFn}}
                                     @onOnlineSelected={{this.emptyFn}}
                                     @onRemoveCustomer={{this.emptyFn}}/>`);

    assert.ok(this.element.querySelector('.icon-delete-white'));
  });

  test('disables take-away customer inputs when @isEditable is false', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/take-away'));

    await render(hbs`<CustomerSelect @customer={{this.customer}}
                                     @isEditable={{false}}
                                     @onTakeAwaySelected={{this.emptyFn}}
                                     @onDeliverySelected={{this.emptyFn}}
                                     @onOnlineSelected={{this.emptyFn}}
                                     @onRemoveCustomer={{this.emptyFn}}/>`);

    assert.ok(this.element.querySelector('input[placeholder="Telephone"]:disabled'));
    assert.ok(this.element.querySelector('input[placeholder="Name"]:disabled'));
  });

  test('disables online customer inputs when @isEditable is false', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/online'));

    await render(hbs`<CustomerSelect @customer={{this.customer}}
                                     @isEditable={{false}}
                                     @onTakeAwaySelected={{this.emptyFn}}
                                     @onDeliverySelected={{this.emptyFn}}
                                     @onOnlineSelected={{this.emptyFn}}
                                     @onRemoveCustomer={{this.emptyFn}}/>`);

    assert.ok(this.element.querySelector('input:disabled'));
  });
});
