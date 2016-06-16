import Order from '../model';
import attr from 'ember-data/attr';

export default Order.extend({
  estimatedTime: attr('number', { defaultValue: 45 })
});
