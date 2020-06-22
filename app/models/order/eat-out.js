import OrderModel from './../order';
import { attr, belongsTo } from '@ember-data/model';

export default class OrderEatOutModel extends OrderModel {
  @attr('number', { defaultValue: 45 }) estimatedTime;
  @belongsTo('customer', { async: false, polymorphic: true }) customer;
}
