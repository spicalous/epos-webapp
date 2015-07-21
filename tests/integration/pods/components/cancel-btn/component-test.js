import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('cancel-btn', 'Integration | Component | cancel btn', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cancel-btn}}`);

  assert.equal(this.$().text(), 'CANCEL');

});
