import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { splitByNewline } from 'epos-webapp/tests/util';

module('Integration | Component | order/eat-in-info', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('order', { tableId: 'TABLEID', tableName: 'Table 1', numberOfGuests: 42 });
    await render(hbs`<Order::EatInInfo @order={{this.order}}/>`);

    let text = splitByNewline(this.element.textContent);
    assert.strictEqual(text.length, 3);
    assert.strictEqual(text[0], 'Table 1');
    assert.strictEqual(text[1], '42');
    assert.strictEqual(text[2], 'ID: TABLEID');
  });
});
