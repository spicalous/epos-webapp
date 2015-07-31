import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['id'],
  id: 'edit-item-modal',
  classNames: ['modal', 'fade'],

  drinkOptions: Ember.A([
    'Add Drink', 'Edit Drink'
  ]),
  foodOptions: Ember.A([
    'Add Food', 'Edit Food'
  ]),

  /**
  *
  * Fires when the user selects an item to edit (itemToEdit === orderItem)
  * Sets the "selected" variable (tabs) based on the primary menu-item category
  */
  editItemObserver: function() {
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

    var categories = itemToEdit.get('menuItem.categories');

    if (categories) {
      switch(categories.objectAt(0).get('id')) {
        case "15":
          this.set('editItemTabs', this.get('drinkOptions'));
          this.set('selected', this.get('drinkOptions').objectAt(0));
          break;
        default:
          this.set('editItemTabs', this.get('foodOptions'));
          this.set('selected', this.get('foodOptions').objectAt(0));
      }
    }
  }.observes('order.itemToEdit'),

  /**
  *
  * Sets the available edit options based on what tab (selected) was selected
  */
  selectedTypeObserver: function() {
    var type = '';

    switch(this.get('selected')) {
      case 'Add Drink': type = 0; break;
      case 'Edit Drink': type = 1; break;
      case 'Add Food': type = 2; break;
      case 'Edit Food': type = 3; break;
    }

    this.set('filteredEditOptions', this.get('editOptions').filterProperty('type', type));
  }.observes('selected'),

  actions: {
    tabClick: function(text) {
      this.set('selected', text);
    },
    editOptionToggle: function(option) {
      this.get('order.itemToEdit').toggleOption(option);
      option.set('checked', !option.get('checked'));
    }
  }
});
