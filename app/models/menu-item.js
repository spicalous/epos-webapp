import Model, { attr, hasMany } from '@ember-data/model';

export default class MenuItemModel extends Model {
  @attr('string') menuId;
  @attr('string') name;
  @attr('string') description;
  @attr('number') price;
  @attr('boolean') emphasisOnPrint;
  @hasMany('category', { async: false }) categories;
  @hasMany('edit-category', { async: false }) editCategories;
}
