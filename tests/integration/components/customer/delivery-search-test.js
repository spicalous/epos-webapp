import { module, test } from 'qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | customer/delivery-search', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
    this.set('emptyFn', function() {});
  });

  test('it renders', async function(assert) {
    await render(hbs`<Customer::DeliverySearch />`);
    assert.strictEqual(this.element.querySelectorAll('input').length, 4);
  });

  test('searching for delivery customer', async function(assert) {
    this.server.loadFixtures('customer/deliveries');

    await render(hbs`<Customer::DeliverySearch as |cds|>
                       {{#if cds.searching}}
                         <div class="searching"></div>
                       {{/if}}
                       {{#each cds.deliveryCustomerSearchResults as |customer|}}
                         <div class="customer"></div>
                       {{/each}}
                     </Customer::DeliverySearch>`);

    let fillInPromise = fillIn('input[placeholder="Telephone"]', '020');
    await waitFor('.searching');
    assert.ok(this.element.querySelector('.searching'), 'shows loader');
    await fillInPromise;

    assert.ok(this.element.querySelectorAll('.customer').length > 0);
  });

  test('change callback executed when any input changes', async function(assert) {
    this.set('onChange', (telephone, addressOne, road, postcode) => { assert.step(`${telephone} ${addressOne} ${road} ${postcode}`); });

    await render(hbs`<Customer::DeliverySearch @onChange={{this.onChange}} as |cds| />`);

    await fillIn('input[placeholder="Telephone"]', 'telephone');
    await fillIn('input[placeholder="House no."]', 'address one');
    await fillIn('input[placeholder="Road"]', 'road');
    await fillIn('input[placeholder="Postcode"]', 'postcode');

    assert.verifySteps(['telephone   ', 'telephone address one  ', 'telephone address one road ', 'telephone address one road postcode']);
  });

  test('error callback executed when searching for delivery customer fails', async function(assert) {
    this.server.get('/customer/deliveries', () => ({ errors: [{ detail: 'A failure reason' }]}), 500);
    this.set('onError', () => { assert.step('error callback'); });
    await render(hbs`<Customer::DeliverySearch @onCustomerSearchError={{this.onError}} as |cds| />`);

    await fillIn('input[placeholder="Telephone"]', 'any value');

    assert.verifySteps(['error callback']);
  });

  test('selecting road suggestion searches customer and calls change callback', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    this.set('onChange', (telephone, addressOne, road, postcode) => { assert.step(`${telephone} ${addressOne} ${road} ${postcode}`); });

    await render(hbs`<Customer::DeliverySearch @onChange={{this.onChange}} as |cds|>
                       {{#each cds.deliveryCustomerSearchResults as |customer|}}
                         <div class="customer"></div>
                       {{/each}}
                     </Customer::DeliverySearch>`);

    await fillIn('input[placeholder="Road"]', 'ON');
    await click('.dropdown-item');

    assert.verifySteps(['  ON ', '  ONE ROAD ']);
    assert.strictEqual(this.element.querySelectorAll('.customer').length, 1);
  });

  test('selecting postcode suggestion searches customer and calls change callback', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    this.set('onChange', (telephone, addressOne, road, postcode) => { assert.step(`${telephone} ${addressOne} ${road} ${postcode}`); });

    await render(hbs`<Customer::DeliverySearch @onChange={{this.onChange}} as |cds|>
                       {{#each cds.deliveryCustomerSearchResults as |customer|}}
                         <div class="customer"></div>
                       {{/each}}
                     </Customer::DeliverySearch>`);

    await fillIn('input[placeholder="Postcode"]', 'AB');
    await click('.dropdown-item');

    assert.verifySteps(['   AB', '   AB1 2CD']);
    assert.strictEqual(this.element.querySelectorAll('.customer').length, 1);
  });

});
