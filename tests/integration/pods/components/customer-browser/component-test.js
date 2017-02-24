import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('customer-browser', 'Integration | Component | customer browser', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{customer-browser}}`);

  assert.equal(this.$('.alert').text().trim(), 'Must be unique to save customer');
});
