import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render, waitFor, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { splitByNewline } from './../../../util';

module('Integration | Component | customer-select/delivery-select', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
    this.loadCustomersAndTagsFixtures = () => {
      this.server.loadFixtures('customer/deliveries');
      this.server.loadFixtures('delivery-customer-tags');
    };
    this.set('emptyFn', function() {});
  });

  test('it renders', async function(assert) {
    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    assert.strictEqual(this.element.querySelectorAll('input').length, 4);
  });

  test('cancel action', async function(assert) {
    this.set('onCancel', () => assert.ok('onCancel action'));

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.onCancel}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await click('.btn-main-secondary');

    assert.expect(1);
  });

  test('searching for delivery customer', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    let fillInPromise = fillIn('input[placeholder="Telephone"]', '020');
    await waitFor('.loader');
    assert.ok(this.element.querySelector('.loader'), 'shows loader');
    await fillInPromise;

    assert.ok(this.element.querySelectorAll('.list-group-item').length > 0);
  });

  test('displays delivery customer with tag', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Telephone"]', '020');

    assert.ok(this.element.querySelectorAll('.list-group-item .badge').length > 0);
  });

  test('app overlay shown when searching for delivery customer fails', async function(assert) {
    this.server.get('/customer/deliveries', () => ({ errors: [{ detail: 'A failure reason' }]}), 500);

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Telephone"]', 'any value');

    assert.ok(this.owner.lookup('service:ui').appOverlayShown);
    assert.strictEqual(this.owner.lookup('service:ui').model.title, 'Search failed :(');
    assert.strictEqual(this.owner.lookup('service:ui').model.message, 'A failure reason');
  });

  test('road suggestions', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Road"]', 'ON');

    let suggestions = splitByNewline(this.element.querySelector('.dropdown-menu').textContent);
    assert.strictEqual(suggestions.length, 1);
    assert.strictEqual(suggestions[0], 'ONE ROAD');
  });

  test('postcode suggestions', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Postcode"]', 'AB');

    let suggestions = splitByNewline(this.element.querySelector('.dropdown-menu').textContent);
    assert.strictEqual(suggestions.length, 4);
    assert.strictEqual(suggestions[0], 'AB1 2CD');
    assert.strictEqual(suggestions[1], 'AB2 2CD');
    assert.strictEqual(suggestions[2], 'AB3 3CD');
    assert.strictEqual(suggestions[3], 'AB4 4CD');
  });

  test('road suggestion error does not display suggestions', async function(assert) {
    this.loadCustomersAndTagsFixtures();
    this.server.get('/roads', () => ({ errors: [{ detail: 'A failure reason' }] }), 500);

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Road"]', 'ON');

    assert.notOk(this.element.querySelector('.dropdown-menu'));
  });

  test('postcode suggestion error does not display suggestions', async function(assert) {
    this.loadCustomersAndTagsFixtures();
    this.server.get('/postcodes', () => ({ errors: [{ detail: 'A failure reason' }]}), 500);

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Postcode"]', 'AB');

    assert.notOk(this.element.querySelector('.dropdown-menu'));
  });

  test('selecting road suggestion searches customer', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Road"]', 'ON');
    await click('.dropdown-item');

    assert.strictEqual(this.element.querySelectorAll('.list-group-item').length, 1);
  });

  test('selecting postcode suggestion searches customer', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Postcode"]', 'AB');
    await click('.dropdown-item');

    assert.strictEqual(this.element.querySelectorAll('.list-group-item').length, 1);
  });

  test('save button not displayed by default', async function(assert) {
    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    assert.notOk(this.element.querySelector('.btn-primary'));
  });

  test('save button not displayed if searching is complete and customer is invalid', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Telephone"]', '020');

    assert.notOk(this.element.querySelector('.btn-primary'));
    assert.ok(this.element.querySelector('.list-group-item'));
    assert.ok(this.element.querySelector('.alert'));
  });

  test('save button not displayed if customer valid and before searching', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Telephone"]', '12345678901');
    fillIn('input[placeholder="House no."]', '1');

    await waitUntil(() => this.element.querySelector('.btn-primary') || this.element.querySelector('.loader'), { timeout: 2000 });

    assert.notOk(this.element.querySelector('.btn-primary'));
    assert.ok(this.element.querySelector('.loader'));
  });

  test('save button not displayed if customer is valid, but there are results', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Telephone"]', '02011111111');
    await fillIn('input[placeholder="House no."]', '1');

    assert.notOk(this.element.querySelector('.btn-primary'));
    assert.notOk(this.element.querySelector('.alert'));
    assert.ok(this.element.querySelector('.list-group-item'));
  });

  test('save button displayed if customer is valid, and no results', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Telephone"]', '10293847561');
    await fillIn('input[placeholder="House no."]', '1');

    assert.ok(this.element.querySelector('.btn-primary'));
    assert.notOk(this.element.querySelector('.alert'));
    assert.notOk(this.element.querySelector('.list-group-item'));
  });

  test('save button not displayed if searching', async function(assert) {
    this.loadCustomersAndTagsFixtures();

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.emptyFn}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Telephone"]', '10293847561');
    await fillIn('input[placeholder="House no."]', '1');

    assert.ok(this.element.querySelector('.btn-primary'));

    let fillInPromise = fillIn('input[placeholder="House no."]', '12');

    await waitFor('.loader');
    assert.notOk(this.element.querySelector('.btn-primary'));

    await fillInPromise;
    assert.ok(this.element.querySelector('.btn-primary'));
  });

  test('pressing save button executes callback with customer info', async function(assert) {
    this.loadCustomersAndTagsFixtures();
    this.set('onSave', ({ telephone, addressOne, road, postcode }) => {
      assert.strictEqual(telephone, '29384820485');
      assert.strictEqual(addressOne, 'addressOne');
      assert.strictEqual(road, 'road');
      assert.strictEqual(postcode, 'postcode');
    });

    await render(hbs`<CustomerSelect::DeliverySelect @onCancel={{this.emptyFn}}
                                                     @onSave={{this.onSave}}
                                                     @onDeliveryCustomerSelected={{this.emptyFn}}/>`);

    await fillIn('input[placeholder="Telephone"]', '29384820485');
    await fillIn('input[placeholder="House no."]', 'addressOne');
    await fillIn('input[placeholder="Road"]', 'road');
    await fillIn('input[placeholder="Postcode"]', 'postcode');

    click('.btn-primary');
    assert.expect(4);
  });
});
