import OrderModel from './../order';
import { attr } from '@ember-data/model';

export default class OrderEatInModel extends OrderModel {
  @attr('string') tableName;
  @attr('string') tableId;
}
