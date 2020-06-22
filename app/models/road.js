import Model, { attr } from '@ember-data/model';

export default class RoadModel extends Model {
  @attr('string') name;
}
