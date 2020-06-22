import Model, { attr } from '@ember-data/model';

export default class EditOptionModel extends Model {
  @attr('number') editCategoryId;
  @attr('string') name;
  @attr('number') price;
}
