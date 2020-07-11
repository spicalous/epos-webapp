import { module, test } from 'qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { splitByNewline } from './../../util';

module('Integration | Component | customer-delivery-search', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
    this.set('emptyFn', function() {});
  });

  test('it renders', async function(assert) {
    await render(hbs`<CustomerDeliverySearch />`);
    assert.strictEqual(this.element.querySelectorAll('input').length, 4);
  });

  test('searching for delivery customer', async function(assert) {
    this.server.loadFixtures('customer/deliveries');

    await render(hbs`<CustomerDeliverySearch as |cds|>
                       {{#if cds.searching}}
                         <div class="searching"></div>
                       {{/if}}
                       {{#each cds.deliveryCustomerSearchResults as |customer|}}
                         <div class="customer"></div>
                       {{/each}}
                     </CustomerDeliverySearch>`);

    let fillInPromise = fillIn('input[placeholder="Telephone"]', '020');
    await waitFor('.searching');
    assert.ok(this.element.querySelector('.searching'), 'shows loader');
    await fillInPromise;

    assert.ok(this.element.querySelectorAll('.customer').length > 0);
  });

  test('change callback executed when any input changes', async function(assert) {
    this.set('onChange', () => { assert.step('change callback'); });

    await render(hbs`<CustomerDeliverySearch @onChange={{this.onChange}} as |cds| />`);

    await fillIn('input[placeholder="Telephone"]', 'any value');
    await fillIn('input[placeholder="House no."]', 'any value');
    await fillIn('input[placeholder="Road"]', 'any value');
    await fillIn('input[placeholder="Postcode"]', 'any value');

    assert.verifySteps(['change callback', 'change callback', 'change callback', 'change callback']);
  });

  test('error callback executed when searching for delivery customer fails', async function(assert) {
    this.server.get('/customer/deliveries', () => {
      return new Response(500, {}, { errors: [{ detail: 'A failure reason' }]});
    });
    this.set('onError', () => { assert.step('error callback'); });
    await render(hbs`<CustomerDeliverySearch @onCustomerSearchError={{this.onError}} as |cds| />`);

    await fillIn('input[placeholder="Telephone"]', 'any value');

    assert.verifySteps(['error callback']);
  });

  test('road suggestions', async function(assert) {
    this.server.loadFixtures('customer/deliveries');

    await render(hbs`<CustomerDeliverySearch />`);

    await fillIn('input[placeholder="Road"]', 'ON');

    let suggestions = splitByNewline(this.element.querySelector('.dropdown-menu').textContent);
    assert.strictEqual(suggestions.length, 1);
    assert.strictEqual(suggestions[0], 'ONE ROAD');
  });

  test('postcode suggestions', async function(assert) {
    this.server.loadFixtures('customer/deliveries');

    await render(hbs`<CustomerDeliverySearch />`);

    await fillIn('input[placeholder="Postcode"]', 'AB');

    let suggestions = splitByNewline(this.element.querySelector('.dropdown-menu').textContent);
    assert.strictEqual(suggestions.length, 3);
    assert.strictEqual(suggestions[0], 'AB1 2CD');
    assert.strictEqual(suggestions[1], 'AB2 2CD');
    assert.strictEqual(suggestions[2], 'AB3 3CD');
  });

  test('road suggestion error does not display suggestions', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    this.server.get('/roads', () => {
      return new Response(500, {}, { errors: [{ detail: 'A failure reason' }]});
    });

    await render(hbs`<CustomerDeliverySearch />`);

    await fillIn('input[placeholder="Road"]', 'ON');

    assert.notOk(this.element.querySelector('.dropdown-menu'));
  });

  test('postcode suggestion error does not display suggestions', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    this.server.get('/postcodes', () => {
      return new Response(500, {}, { errors: [{ detail: 'A failure reason' }]});
    });

    await render(hbs`<CustomerDeliverySearch />`);

    await fillIn('input[placeholder="Postcode"]', 'AB');

    assert.notOk(this.element.querySelector('.dropdown-menu'));
  });

  test('selecting road suggestion searches customer', async function(assert) {
    this.server.loadFixtures('customer/deliveries');

    await render(hbs`<CustomerDeliverySearch as |cds|>
                       {{#each cds.deliveryCustomerSearchResults as |customer|}}
                         <div class="customer"></div>
                       {{/each}}
                     </CustomerDeliverySearch>`);

    await fillIn('input[placeholder="Road"]', 'ON');
    await click('.dropdown-item');

    assert.strictEqual(this.element.querySelectorAll('.customer').length, 1);
  });

  test('selecting postcode suggestion searches customer', async function(assert) {
    this.server.loadFixtures('customer/deliveries');

    await render(hbs`<CustomerDeliverySearch as |cds|>
                       {{#each cds.deliveryCustomerSearchResults as |customer|}}
                         <div class="customer"></div>
                       {{/each}}
                     </CustomerDeliverySearch>`);

    await fillIn('input[placeholder="Postcode"]', 'AB');
    await click('.dropdown-item');

    assert.strictEqual(this.element.querySelectorAll('.customer').length, 1);
  });

});
