import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('number-pad', 'Integration | Component | number pad', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{number-pad}}`);

  assert.equal(this.$('button').length, '12');
});
