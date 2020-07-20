import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { UIStub } from './../../../util';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | customer/delivery-tag-card', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.db.emptyData();
    this.owner.register('service:ui', UIStub);
  });

  test('it renders', async function(assert) {
    this.set('tag', this.owner.lookup('service:store').createRecord('delivery-customer-tag', { name: 'tag name', colour: 'red' }));
    this.set('onSave', () => {});
    this.set('onDelete', () => {});

    await render(hbs`<Customer::DeliveryTagCard @tag={{tag}} @onSave={{this.onSave}} @onDelete={{this.onDelete}}/>`);

    assert.strictEqual(this.element.querySelector('span').textContent.trim(), 'tag name');
  });

  test('clicking edit shows edit controls', async function(assert) {
    this.set('tag', this.owner.lookup('service:store').createRecord('delivery-customer-tag', { name: 'tag name', colour: 'red' }));
    this.set('onSave', () => {});
    this.set('onDelete', () => {});

    await render(hbs`<Customer::DeliveryTagCard @tag={{tag}} @onSave={{this.onSave}} @onDelete={{this.onDelete}}/>`);
    await click('.btn');

    assert.strictEqual(this.element.querySelector('input').value, 'tag name');
    assert.ok(this.element.querySelector('.dropdown-toggle .badge-danger'));
  });

  test('clicking cancel stops editing and rolls back attributes', async function(assert) {
    this.server.post('/delivery-customer-tags');
    let tag = await this.owner.lookup('service:store')
      .createRecord('delivery-customer-tag', { name: 'tag name', colour: 'red' })
      .save();
    this.set('tag', tag);
    this.set('onSave', () => {});
    this.set('onDelete', () => {});

    await render(hbs`<Customer::DeliveryTagCard @tag={{tag}} @onSave={{this.onSave}} @onDelete={{this.onDelete}}/>`);
    await click('.btn');

    await fillIn('input', 'anything');
    await click('.justify-content-between .btn-main-secondary');

    assert.notOk(this.element.querySelector('input'));
    assert.strictEqual(this.element.querySelector('span').textContent.trim(), 'tag name');
  });

  test('clicking delete calls action', async function(assert) {
    this.set('tag', this.owner.lookup('service:store').createRecord('delivery-customer-tag', { name: 'tag name', colour: 'red' }));
    this.set('onSave', () => {});
    this.set('onDelete', () => assert.step('delete'));

    await render(hbs`<Customer::DeliveryTagCard @tag={{tag}} @onSave={{this.onSave}} @onDelete={{this.onDelete}}/>`);
    await click('.btn');
    await click('.btn-danger');

    const stubUI = this.owner.lookup('service:ui');
    assert.strictEqual(stubUI.title, 'Delete tag');
    assert.strictEqual(stubUI.message, 'Are you sure you want to delete this tag?');
    assert.strictEqual(stubUI.btnClass, 'btn-danger');
    assert.strictEqual(stubUI.btnText, 'Delete');
    stubUI.callback();
    assert.verifySteps(['delete']);
  });

  test('save button is enabled only if dirty attributes', async function(assert) {
    this.server.post('/delivery-customer-tags');
    let tag = await this.owner.lookup('service:store')
      .createRecord('delivery-customer-tag', { name: 'tag name', colour: 'red' })
      .save();
    this.set('tag', tag);
    this.set('onSave', () => {});
    this.set('onDelete', () => {});

    await render(hbs`<Customer::DeliveryTagCard @tag={{tag}} @onSave={{this.onSave}} @onDelete={{this.onDelete}}/>`);

    await click('.btn');
    assert.ok(this.element.querySelector('.btn-secondary[disabled]'));
    assert.notOk(this.element.querySelector('.btn-primary'));

    await fillIn('input', 'new updated tag name');
    assert.notOk(this.element.querySelector('.btn-secondary[disabled]'));
    assert.ok(this.element.querySelector('.btn-primary'));

    await fillIn('input', 'tag name');
    assert.ok(this.element.querySelector('.btn-secondary[disabled]'));
    assert.notOk(this.element.querySelector('.btn-primary'));

    await click('.dropdown-toggle');
    await click('.dropdown-menu .dropdown-item:nth-child(3)');
    assert.notOk(this.element.querySelector('.btn-secondary[disabled]'));
    assert.ok(this.element.querySelector('.btn-primary'));

    await click('.dropdown-toggle');
    await click('.dropdown-menu .dropdown-item:nth-child(4)');
    assert.ok(this.element.querySelector('.btn-secondary[disabled]'));
    assert.notOk(this.element.querySelector('.btn-primary'));
  });

  test('saving calls onSave action and passes callback to stop editing', async function(assert) {
    this.server.post('/delivery-customer-tags');
    let tag = await this.owner.lookup('service:store')
      .createRecord('delivery-customer-tag', { name: 'tag name', colour: 'red' })
      .save();
    this.set('tag', tag);
    this.set('onSave', (tag, onSuccess) => {
      assert.step('save');
      onSuccess();
    });
    this.set('onDelete', () => {});

    await render(hbs`<Customer::DeliveryTagCard @tag={{tag}} @onSave={{this.onSave}} @onDelete={{this.onDelete}}/>`);

    await click('.btn');
    await fillIn('input', 'new updated tag name');
    await click('.btn-primary');

    assert.verifySteps(['save']);
    assert.notOk(this.element.querySelector('input'));
  });

});
