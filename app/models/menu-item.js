import DS from 'ember-data';

export default DS.Model.extend({
  menuId: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  price: DS.attr('number'),
  emphasisOnPrint: DS.attr('boolean'),
  categories: DS.hasMany('category'),
  editCategories: DS.hasMany('edit-category')
});
