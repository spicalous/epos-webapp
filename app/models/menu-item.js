import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  menuId: attr('string'),
  name: attr('string'),
  description: attr('string'),
  price: attr('number'),
  emphasisOnPrint: attr('boolean'),

  categories: hasMany('category'),
  editCategories: hasMany('edit-category')
});
