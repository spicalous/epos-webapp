import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  editCategory: attr('number'),
  name: attr('string'),
  price: attr('number')
});
