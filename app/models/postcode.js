import Model, { attr } from '@ember-data/model';

export default class PostcodeModel extends Model {
  @attr('string') postcode;
}
