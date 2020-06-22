import Model, { attr } from '@ember-data/model';

export default class CustomerModel extends Model {
  @attr('string', { defaultValue: '' }) telephone;
}

export function validate(telephone) {
  if (!telephone || !telephone.trim()) {
    return 'Telephone number required.';
  }
  if (telephone.length < 11) {
    return 'Telephone number is too short.';
  }
  if (telephone.length > 11) {
    return 'Telephone number is too long.';
  }
  return '';
}
