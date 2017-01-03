import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('category-item', 'Integration | Component | category item', {
  integration: true
});

test('it displays the category name', function(assert) {

  this.set('category', { name: 'Category name'});

  this.render(hbs`{{category-item category=category}}`);

  assert.equal(this.$().text().trim(), 'Category name');
});

test('it adds selected class if the category is selected', function(assert) {

  const category = { name: 'Category name'};
  this.set('category', category);

  this.render(hbs`{{category-item category=category selected=selectedCategory}}`);
  this.set('selectedCategory', category);

  assert.equal(this.$('button.is-selected').length, 1);
});

