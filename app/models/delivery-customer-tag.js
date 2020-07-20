import Model, { attr } from '@ember-data/model';

export default class DeliveryCustomerTagModel extends Model {
  @attr('string') name;
  @attr('string') colour;
}

export const PATTERN = /^[a-zA-Z0-9 .\-+*£%]{1,100}$/;
export const PATTERN_STRING = '^[a-zA-Z0-9 .\\-+*£%]{1,100}$';

export function validate(name) {
  if (!name || !name.trim()) {
    return 'Tag name required.';
  }
  if (name.length > 100) {
    return 'Tag name too long.';
  }
  if (PATTERN.test(name)) {
    return '';
  }
  return 'Can only contain letters, numbers and ".-+*£%".';
}
