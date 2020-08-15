import Model, { attr, hasMany } from '@ember-data/model';

export const MODIFIER_TYPES = {
  PERCENT: 'PERCENT',
  ABSOLUTE: 'ABSOLUTE'
};

export default class OrderModifierModel extends Model {
  @attr('string') type;
  @attr('number') value;
  @hasMany('order') orders;
}
