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
    var itemToEdit = this.get('order.itemToEdit');

    if (!itemToEdit) {
      return;
    }

    var orderItemEditOptions = itemToEdit.get('editOptions'),
        editOptions = this.get('editOptions');

    editOptions.forEach(function(option) {
      if (orderItemEditOptions.indexOf(option) > -1) {
        option.set('checked', true);
      } else {
        option.set('checked', false);
      }
    });

    var editCategories = itemToEdit.get('menuItem.editCategories');

    this.set('editItemTabs', editCategories);
    this.set('selected', editCategories.get('firstObject'));
  }),

  filteredEditOptions: Ember.computed('selected', function() {
    if (!this.get('selected')) {
      return;
    }
    var selectedEditCategoryId = this.get('selected').get('id');
    return this.get('editOptions').filterBy('editCategory', parseInt(selectedEditCategoryId));
  }),

  actions: {

    tabClick(editCategory) {
      this.set('selected', editCategory);
    },

    editOptionToggle(option) {
      this.get('order.itemToEdit').toggleOption(option);
      option.set('checked', !option.get('checked'));
    }

  }
});
