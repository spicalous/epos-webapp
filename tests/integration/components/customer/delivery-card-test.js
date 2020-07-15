import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { UIStub, splitByNewline } from './../../../util';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | customer/delivery-card', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
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

  test('validates customer when editing', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/delivery', { telephone: '12345678901', addressOne: 'address one', road: 'road', postcode: 'postcode' }));

    await render(hbs`<Customer::DeliveryCard @customer={{this.customer}} />`);
    await click('.btn-main-secondary');

    assert.notOk(this.element.querySelector('.alert'));
    await fillIn('input[placeholder="Telephone"]', '123');
    assert.ok(this.element.querySelector('.alert'));
    await fillIn('input[placeholder="Telephone"]', '12345678901');

    assert.notOk(this.element.querySelector('.alert'));
    await fillIn('input[placeholder="House no."]', '');
    await fillIn('input[placeholder="Road"]', '');
    assert.ok(this.element.querySelector('.alert'));
  });

  test('does not enable save if attributes are not dirty', async function(assert) {
    this.server.post('/customer/deliveries', 'customer/deliveries');
    let customer = await this.owner.lookup('service:store')
      .createRecord('customer/delivery', { telephone: '12345678901', addressOne: 'address one', road: 'road', postcode: 'postcode' })
      .save();
    this.set('customer', customer);

    await render(hbs`<Customer::DeliveryCard @customer={{this.customer}} />`);
    await click('.btn-main-secondary');

    assert.notOk(this.element.querySelector('.btn-primary'));
    await fillIn('input[placeholder="Road"]', 'roadd');
    assert.ok(this.element.querySelector('.btn-primary'));
    await fillIn('input[placeholder="Road"]', 'road');
    assert.notOk(this.element.querySelector('.btn-primary'));
  });

  test('cancel edit rolls back attributes and resets invalid message', async function(assert) {
    this.server.post('/customer/deliveries', 'customer/deliveries');
    let customer = await this.owner.lookup('service:store')
      .createRecord('customer/delivery', { telephone: '12345678901', addressOne: 'address one', road: 'road', postcode: 'postcode' })
      .save();
    this.set('customer', customer);

    await render(hbs`<Customer::DeliveryCard @customer={{this.customer}} />`);
    await click('.btn-main-secondary');

    assert.notOk(this.element.querySelector('.btn-primary'));
    await fillIn('input[placeholder="Telephone"]', '123123');
    await fillIn('input[placeholder="Road"]', 'a new road');

    assert.ok(this.element.querySelector('.alert'));
    await click('.btn-main-secondary');

    assert.notOk(this.element.querySelector('.alert'));
    let text = splitByNewline(this.element.querySelector('.card-body p').textContent);
    assert.strictEqual(text[0], '12345678901');
    assert.strictEqual(text[1], 'address one');
    assert.strictEqual(text[2], 'road');
    assert.strictEqual(text[3], 'postcode');
  });

  test('editing customer calls ui confirm', async function(assert) {
    this.server.post('/customer/deliveries', 'customer/deliveries');
    let customer = await this.owner.lookup('service:store')
      .createRecord('customer/delivery', { telephone: '12345678901', addressOne: 'address one', road: 'road', postcode: 'postcode' })
      .save();
    this.set('customer', customer);
    this.set('onEditCallback', () => { assert.step('edit callback'); });

    await render(hbs`<Customer::DeliveryCard @customer={{this.customer}} @onEdit={{this.onEditCallback}}/>`);
    await click('.btn-main-secondary');

    await fillIn('input[placeholder="Postcode"]', 'ABC123');
    await click('.btn-primary');

    const stubUI = this.owner.lookup('service:ui');
    assert.strictEqual(stubUI.title, 'Confirm edit customer');
    assert.strictEqual(stubUI.message, 'Save changes?');
    assert.strictEqual(stubUI.btnText, 'Save');
    stubUI.callback();
    assert.verifySteps(['edit callback']);
  });
});
