import { attr } from '@ember-data/model';
import CustomerModel, { validate as validateTelephone } from './../customer';

export default class CustomerOnlineModel extends CustomerModel {
  @attr('string', { defaultValue: '' }) orderId;
}

export function validate(telephone) {
  return (!telephone || !telephone.trim())
    ? ''
    : validateTelephone(telephone);
}
