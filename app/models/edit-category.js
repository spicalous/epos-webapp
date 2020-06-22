import Model, { attr } from '@ember-data/model';

export default class EditCategoryModel extends Model {
  @attr('string') name;
}
