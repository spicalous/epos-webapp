import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default class OrderItemModel extends Model {
  @attr('number') quantity;
  @belongsTo('menu-item') menuItem;
  @hasMany('edit-option') editOptions;

  @computed('editOptions.[]')
  get editOptionTotal() {
    return this.editOptions.reduce(function(prev, item) {
      return prev + item.get('price');
    }, 0);
  }

  @computed('quantity', 'menuItem', 'editOptionTotal')
  get total() {
    return this.quantity * (this.menuItem.get('price') + this.editOptionTotal);
  }

  isMenuItem(menuItem) {
    return this.menuItem.get('id') === menuItem.get('id');
  }

  hasNoEditOptions() {
    return this.editOptions.length === 0;
  }
}
