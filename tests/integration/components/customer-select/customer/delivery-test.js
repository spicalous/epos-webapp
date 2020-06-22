import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { splitByNewline } from './../../../../util';

module('Integration | Component | customer-select/customer/delivery', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('customer', this.owner.lookup('service:store').createRecord('customer/delivery', {
      telephone: '12345678901',
      addressOne: 'address one',
      road: 'road',
      postcode: 'postcode'
    }));

    await render(hbs`<CustomerSelect::Customer::Delivery @customer={{this.customer}}/>`);

    let text = splitByNewline(this.element.textContent);
    assert.strictEqual(text[0], '12345678901');
    assert.strictEqual(text[1], 'address one road');
    assert.strictEqual(text[2], 'postcode');
  });
});
