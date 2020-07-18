import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { splitByNewline } from './../../../util';

module('Integration | Component | customer/delivery-input', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
    this.set('emptyFn', function() {});
  });

  test('it renders', async function(assert) {
    await render(hbs`<Customer::DeliveryInput />`);
    assert.strictEqual(this.element.querySelectorAll('input').length, 4);
  });

  test('allows supplying default values', async function(assert) {
    this.set('telephone', 'telephone value');
    this.set('addressOne', 'address one value');
    this.set('road', 'road value');
    this.set('postcode', 'postcode value');
    this.set('onChange', (telephone, addressOne, road, postcode) => { assert.step(`${telephone} ${addressOne} ${road} ${postcode}`); });

    await render(hbs`<Customer::DeliveryInput @telephone={{this.telephone}}
                                              @addressOne={{this.addressOne}}
                                              @road={{this.road}}
                                              @postcode={{this.postcode}}
                                              @onChange={{this.onChange}} as |cds| />`);

    assert.strictEqual(this.element.querySelector('input[placeholder="Telephone"]').value, 'telephone value');
    assert.strictEqual(this.element.querySelector('input[placeholder="House no."]').value, 'address one value');
    assert.strictEqual(this.element.querySelector('input[placeholder="Road"]').value, 'road value');
    assert.strictEqual(this.element.querySelector('input[placeholder="Postcode"]').value, 'postcode value');

    await fillIn('input[placeholder="Road"]', 'a new road');

    assert.verifySteps(['telephone value address one value a new road postcode value']);
    assert.strictEqual(this.get('telephone'), 'telephone value');
    assert.strictEqual(this.get('addressOne'), 'address one value');
    assert.strictEqual(this.get('road'), 'road value');
    assert.strictEqual(this.get('postcode'), 'postcode value');
  });

  test('change callback executed when any input changes', async function(assert) {
    this.set('onChange', (telephone, addressOne, road, postcode) => { assert.step(`${telephone} ${addressOne} ${road} ${postcode}`); });

    await render(hbs`<Customer::DeliveryInput @onChange={{this.onChange}} as |cds| />`);

    await fillIn('input[placeholder="Telephone"]', 'telephone');
    await fillIn('input[placeholder="House no."]', 'address one');
    await fillIn('input[placeholder="Road"]', 'road');
    await fillIn('input[placeholder="Postcode"]', 'postcode');

    assert.verifySteps(['telephone   ', 'telephone address one  ', 'telephone address one road ', 'telephone address one road postcode']);
  });

  test('road suggestions', async function(assert) {
    this.server.loadFixtures('customer/deliveries');

    await render(hbs`<Customer::DeliveryInput />`);

    await fillIn('input[placeholder="Road"]', 'ON');

    let suggestions = splitByNewline(this.element.querySelector('.dropdown-menu').textContent);
    assert.strictEqual(suggestions.length, 1);
    assert.strictEqual(suggestions[0], 'ONE ROAD');
  });

  test('postcode suggestions', async function(assert) {
    this.server.loadFixtures('customer/deliveries');

    await render(hbs`<Customer::DeliveryInput />`);

    await fillIn('input[placeholder="Postcode"]', 'AB');

    let suggestions = splitByNewline(this.element.querySelector('.dropdown-menu').textContent);
    assert.strictEqual(suggestions.length, 3);
    assert.strictEqual(suggestions[0], 'AB1 2CD');
    assert.strictEqual(suggestions[1], 'AB2 2CD');
    assert.strictEqual(suggestions[2], 'AB3 3CD');
  });

  test('road suggestion error does not display suggestions', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    this.server.get('/roads', () => ({ errors: [{ detail: 'A failure reason' }]}), 500);

    await render(hbs`<Customer::DeliveryInput />`);

    await fillIn('input[placeholder="Road"]', 'ON');

    assert.notOk(this.element.querySelector('.dropdown-menu'));
  });

  test('postcode suggestion error does not display suggestions', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    this.server.get('/postcodes', () => ({ errors: [{ detail: 'A failure reason' }]}), 500);

    await render(hbs`<Customer::DeliveryInput />`);

    await fillIn('input[placeholder="Postcode"]', 'AB');

    assert.notOk(this.element.querySelector('.dropdown-menu'));
  });

  test('selecting road suggestion calls change callback', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    this.set('onChange', (telephone, addressOne, road, postcode) => { assert.step(`${telephone} ${addressOne} ${road} ${postcode}`); });

    await render(hbs`<Customer::DeliveryInput @onChange={{this.onChange}} as |cds| />`);

    await fillIn('input[placeholder="Road"]', 'ON');
    await click('.dropdown-item');

    assert.verifySteps(['  ON ', '  ONE ROAD ']);
  });

  test('selecting postcode suggestion searches customer', async function(assert) {
    this.server.loadFixtures('customer/deliveries');
    this.set('onChange', (telephone, addressOne, road, postcode) => { assert.step(`${telephone} ${addressOne} ${road} ${postcode}`); });

    await render(hbs`<Customer::DeliveryInput @onChange={{this.onChange}} as |cds| />`);

    await fillIn('input[placeholder="Postcode"]', 'AB');
    await click('.dropdown-item');

    assert.verifySteps(['   AB', '   AB1 2CD']);
  });

});
