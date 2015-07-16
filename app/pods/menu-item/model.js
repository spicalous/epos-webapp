import DS from "ember-data";

export default DS.Model.extend({
  menuId: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  price: DS.attr('number'),
  categories: DS.hasMany('category')
});
