import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('category-item', 'Integration | Component | category item', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(0);

  //TODO Fix Test
  // this.set('category.name', 'Category Test');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{category-item}}`);
});
