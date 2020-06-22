import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | order-list/customer', function(hooks) {
  setupRenderingTest(hooks);

  test('customer icon based on customer type', async function(assert) {
    let delivery = this.owner.lookup('service:store').createRecord('customer/delivery', {});
    let takeAway = this.owner.lookup('service:store').createRecord('customer/take-away', {});
    let online = this.owner.lookup('service:store').createRecord('customer/online', {});

    await render(hbs`<OrderList::Customer @customer={{this.customer}}/>`);
    assert.ok(this.element.querySelector('span.icon-customer-unknown'));

    this.set('customer', delivery);
    assert.ok(this.element.querySelector('span.icon-customer-delivery'));

    this.set('customer', takeAway);
    assert.ok(this.element.querySelector('span.icon-customer-take-away'));

    this.set('customer', online);
    assert.ok(this.element.querySelector('span.icon-customer-online'));
  });

  test('default customer info', async function(assert) {
    let takeAway = this.owner.lookup('service:store').createRecord('customer/take-away', {});
    let online = this.owner.lookup('service:store').createRecord('customer/online', {});

    await render(hbs`<OrderList::Customer @customer={{this.customer}}/>`);

    this.set('customer', takeAway);
    assert.strictEqual(this.element.querySelector('div:nth-child(2) > div').textContent.trim(), 'TAKE AWAY');

    this.set('customer', online);
    assert.strictEqual(this.element.querySelector('div:nth-child(2) > div').textContent.trim(), 'ONLINE ORDER');
  });

  test('customer info based on customer type', async function(assert) {
    let delivery = this.owner.lookup('service:store').createRecord('customer/delivery', {
      telephone: 'telephone',
      addressOne: 'address one',
      road: 'road',
      postcode: 'postcode'
    });
    let takeAway = this.owner.lookup('service:store').createRecord('customer/take-away', {
      telephone: 'telephone',
      name: 'name'
    });
    let online = this.owner.lookup('service:store').createRecord('customer/online', {
      orderId: 'orderId'
    });

    await render(hbs`<OrderList::Customer @customer={{this.customer}}/>`);
    assert.strictEqual(this.element.querySelector('div:nth-child(2)').textContent.trim(), 'Unknown customer type');

    this.set('customer', delivery);
    assert.strictEqual(this.element.querySelector('div:nth-child(2) > div').textContent.trim(), 'address one road');
    assert.strictEqual(this.element.querySelector('div:nth-child(2) > div:nth-child(2)').textContent.trim(), 'postcode');
    assert.strictEqual(this.element.querySelector('div:nth-child(2) > div:nth-child(3)').textContent.trim(), 'telephone');

    this.set('customer', takeAway);
    assert.strictEqual(this.element.querySelector('div:nth-child(2) > div').textContent.trim(), 'name');
    assert.strictEqual(this.element.querySelector('div:nth-child(2) > div:nth-child(2)').textContent.trim(), 'telephone');

    this.set('customer', online);
    assert.strictEqual(this.element.querySelector('div:nth-child(2)').textContent.trim(), 'orderId');
  });

  test('allows block content', async function(assert) {

    await render(hbs`
      <OrderList::Customer>
        <div id="order-list-item-customer-block-content-test">
          order-list-item-customer-block-content-test
        </div>
      </OrderList::Customer>
    `);

    assert.equal(this.element.querySelector('#order-list-item-customer-block-content-test').textContent.trim(), 'order-list-item-customer-block-content-test');
  });
});
