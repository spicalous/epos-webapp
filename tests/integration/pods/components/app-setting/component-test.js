import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-setting', 'Integration | Component | app setting', {
  integration: true
});

test('it renders', function(assert) {
  this.set('setting', { name: 'Setting Name', value: true});

  this.render(hbs`{{app-setting setting=setting}}`);

  assert.equal(this.$().text().trim(), 'Setting Name');
});
