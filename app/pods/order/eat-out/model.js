import Order from '../model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Order.extend({
  estimatedTime: attr('number', { defaultValue: 45 }),

  customer: belongsTo('customer', { polymorphic: true })
});
