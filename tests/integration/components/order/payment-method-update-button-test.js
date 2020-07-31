import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { UIStub } from 'epos-webapp/tests/util';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | order/payment-method-update-button', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function() {
    this.owner.register('service:ui', UIStub);
  });

  test('it renders', async function(assert) {
    this.server.create('order/eat-out', mockOrder(null));
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1));

    await render(hbs`<Order::PaymentMethodUpdateButton @order={{this.order}} />`);
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £0.00');

    this.set('order.paymentMethod', 'ARBITRARY');
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'ARBITRARY £0.00');
  });

  test('updating payment method', async function(assert) {
    this.server.create('order/eat-out', mockOrder(null));
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1));

    await render(hbs`<Order::PaymentMethodUpdateButton @order={{this.order}} />`);
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £0.00');

    await click('.dropdown-menu');
    await click('.dropdown-item:nth-child(2)');

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'CASH £0.00');
    const uiService = this.owner.lookup('service:ui');
    assert.strictEqual(uiService.message, 'Updated payment method');
  });

  test('fail updating payment method rollsback attributes', async function(assert) {
    this.server.create('order/eat-out', mockOrder(null));
    this.server.patch('/order/eat-outs/:id', 500);
    this.set('order', await this.owner.lookup('service:store').findRecord('order/eat-out', 1));

    await render(hbs`<Order::PaymentMethodUpdateButton @order={{this.order}} />`);
    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £0.00');

    await click('.dropdown-menu');
    await click('.dropdown-item:nth-child(2)');

    assert.strictEqual(this.element.querySelector('[test-id="order-card-payment-info"]').textContent.trim(), 'NOT PAID £0.00');
    const uiService = this.owner.lookup('service:ui');
    assert.strictEqual(uiService.message, 'Failed to update payment method');
  });

  function mockOrder(paymentMethod) {
    return { dateTime: '2016-03-09T12:34:45.000Z', notes: '', estimatedTime: 45, paymentMethod, customer: null, orderItems: [] };
  }
});
