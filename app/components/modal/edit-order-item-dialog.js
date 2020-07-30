import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';

export default class ModalEditOrderItemDialogComponent extends Component {

  @tracked
  selectedEditCategoryId;

  constructor() {
    super(...arguments);
    this.selectedEditCategoryId = this.args.item.get('menuItem.editCategories.firstObject.id');
  }

  @computed('args.editOptions', 'selectedEditCategoryId')
  get editOptionsForSelectedEditCategoryId() {
    return this.args.editOptions.filterBy('editCategoryId', parseInt(this.selectedEditCategoryId));
  }

  @computed('args.{editOptions,item}', 'editCategoryId')
  get editOptionsGroupedByEditCategory() {
    return this.args.item.get('menuItem.editCategories').map(editCategory => {
      return {
        editCategory,
        editOptions: this.args.editOptions.filterBy('editCategoryId', parseInt(editCategory.get('id')))
      };
    });
  }

  @action
  setSelectedEditCategory(id) {
    this.selectedEditCategoryId = id;
  }

  @action
  toggleEditOption(editOption) {
    let editOptions = this.args.item.get('editOptions');

    if (editOptions.indexOf(editOption) === -1) {
      editOptions.pushObject(editOption);
    } else {
      editOptions.removeObject(editOption);
    }
  }
}
