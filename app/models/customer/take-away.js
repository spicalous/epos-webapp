import { attr } from '@ember-data/model';
import CustomerModel, { validate as validateTelephone } from './../customer';

export default class CustomerTakeAwayModel extends CustomerModel {
  @attr('string', { defaultValue: '' }) name;
}

export function validate(telephone) {
  return (!telephone || !telephone.trim())
    ? ''
    : validateTelephone(telephone);
}
