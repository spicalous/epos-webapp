import Model, { attr } from '@ember-data/model';

export default class SettingModel extends Model {
  @attr('string') name;
  @attr('number') value;
}
