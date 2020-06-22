import { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import CustomerModel, { validate as validateTelephone } from './../customer';

export default class CustomerDeliveryModel extends CustomerModel {
  @attr('string', { defaultValue: '' }) addressOne;
  @attr('string', { defaultValue: '' }) road;
  @attr('string', { defaultValue: '' }) postcode;

  @computed('addressOne', 'road')
  get address() {
    let addressOne = this.addressOne ? this.addressOne.trim() : '';
    let road = this.road ? this.road.trim() : '';

    return addressOne
      ? addressOne + (road ? ' ' + road : '')
      : road;
  }

}

export function validate(telephone, addressOne, road, postcode) {
  let invalidReasons = [validateTelephone(telephone)];

  if ((!addressOne || !addressOne.trim()) && (!road || !road.trim())) {
    invalidReasons.push('Address required.');
  }
  if ((addressOne && addressOne.length > 100) || (road && road.length > 100)) {
    invalidReasons.push('Address must not be more than 100 characters.');
  }
  if (postcode && postcode.length > 10) {
    invalidReasons.push('Postcode must not be more than 10 characters.');
  }
  return invalidReasons.join(' ').trim();
}
