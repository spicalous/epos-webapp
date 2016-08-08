import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  tableId: attr('string'),
  status: attr('string'),

  order: hasMany('order/eat-in')
});
