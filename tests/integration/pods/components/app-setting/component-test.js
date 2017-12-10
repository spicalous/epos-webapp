import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-setting', 'Integration | Component | app setting', {
  integration: true
});

test('it renders', function(assert) {
  this.set('setting', { name: 'Setting Name', value: 1});

  this.render(hbs`{{app-setting setting=setting}}`);

  assert.ok(this.$('div div:eq(1)').text().trim(), 'Setting Name');
});

// TODO when I convert to ember-mocha
// settings name
// settings value is active
// does not save if old === new
// updates when changing setting
// calls onError action if saving error
