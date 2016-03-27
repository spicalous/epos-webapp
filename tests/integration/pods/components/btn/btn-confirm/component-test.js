import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('btn/btn-confirm', 'Integration | Component | btn/btn confirm', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{btn/btn-confirm}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#btn/btn-confirm}}
      template block text
    {{/btn/btn-confirm}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
