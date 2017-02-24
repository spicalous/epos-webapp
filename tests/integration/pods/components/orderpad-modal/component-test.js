import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('orderpad-modal', 'Integration | Component | orderpad modal', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{orderpad-modal}}`);

  assert.equal(this.$().text().trim(), '×');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#orderpad-modal}}
      <div class='test-orderpad-modal-yield'>THIS IS THE YIELD</div>
    {{/orderpad-modal}}
  `);

  assert.ok(this.$('.test-orderpad-modal-yield').text().trim(), 'THIS IS THE YIELD');
});
