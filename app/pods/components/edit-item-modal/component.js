import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['id'],
  id: 'edit-item-modal',
  classNames: ['modal', 'fade'],

  /**
  *
  * Fires when the user selects an item to edit (itemToEdit === orderItem)
  */
  editItemObserver: Ember.observer('order.itemToEdit', function() {
    let itemToEdit = this.get('order.itemToEdit');

    if (!itemToEdit) {
      return;
    }

    let orderItemEditOptions = itemToEdit.get('editOptions');
    let editCategories = itemToEdit.get('menuItem.editCategories');
    let editOptions = this.get('editOptions');

    editOptions.forEach(
        (option) => option.set('checked', orderItemEditOptions.indexOf(option) > -1));

    this.set('editItemTabs', editCategories);
    this.set('selectedEditCategory', editCategories.get('firstObject'));
  }),

  filteredEditOptions: Ember.computed('selectedEditCategory', function() {
    if (!this.get('selectedEditCategory')) {
      return;
    }
    let selectedEditCategoryId = this.get('selectedEditCategory').get('id');
    return this.get('editOptions').filterBy('editCategory', parseInt(selectedEditCategoryId));
  }),

  actions: {

    tabClick(editCategory) {
      this.set('selectedEditCategory', editCategory);
    },

    editOptionToggle(option) {
      this.get('order.itemToEdit').toggleOption(option);
      option.set('checked', !option.get('checked'));
    }

  }
});
