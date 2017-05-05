import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('order-online-customer', 'Integration | Component | order online customer', {
  integration: true
});

test('it renders default if id is not set', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{order-online-customer}}`);

  assert.equal(this.$().text().trim(), 'ONLINE ORDER');
});
