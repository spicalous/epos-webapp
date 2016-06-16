import Order from '../model';
import { belongsTo } from 'ember-data/relationships';

export default Order.extend({
  table: belongsTo('table'),
});
