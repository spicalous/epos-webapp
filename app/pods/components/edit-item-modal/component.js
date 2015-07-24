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
  * Sets the editType variable (tabs) based on the primary menu-item category
  */
  editItemObserver: function() {
    var itemToEdit = this.get('order.itemToEdit');

    if (!itemToEdit) {
      return;
    }

    var orderItemEditOptions = itemToEdit.get('editOptions'),
        editOptions = this.get('editOptions'),
        _this = this;

    editOptions.forEach(function(option) {
      if (orderItemEditOptions.indexOf(option) > -1) {
        option.set('checked', true);
      } else {
        option.set('checked', false);
      }
    });

    orderItemEditOptions.forEach(function(option) {
      _this.set(option.get('name'), true);
    });

    var categories = itemToEdit.get('menuItem.categories');

    if (categories) {
      this.set('mainCategory', categories.objectAt(0).get('id'));

      switch(this.get('mainCategory')) {
        case "16":
          this.set('editType', 0);
          break;
        default:
          this.set('editType', 2);
      }
    }
  }.observes('order.itemToEdit'),

  /**
  *
  * Fired when an itemToEdit has changed
  * Updates the tab options
  * Updates the "selected" parameter used to set the "active" class on the selected tab
  */
  editTypeObserver: function() {
    switch(this.get('editType')) {
      case 0:
        this.set('editItemTabs', this.get('drinkOptions'));
        this.set('selected', this.get('drinkOptions').objectAt(0));
        break;
      case 1:
        this.set('editItemTabs', this.get('drinkOptions'));
        this.set('selected', this.get('drinkOptions').objectAt(1));
        break;
      case 2:
        this.set('editItemTabs', this.get('foodOptions'));
        this.set('selected', this.get('foodOptions').objectAt(0));
        break;
      case 3:
        this.set('editItemTabs', this.get('foodOptions'));
        this.set('selected', this.get('foodOptions').objectAt(1));
        break;
    }
  }.observes('editType'),

  /**
  *
  * Sets the available edit options based on what tab (editType) was selected
  */
  selectedTypeObserver: function() {
    var type = '';

    switch(this.get('selected')) {
      case 'Add Drink': type = 0;break;
      case 'Edit Drink': type = 1;break;
      case 'Add Food': type = 2;break;
      case 'Edit Food': type = 3;break;
    }

    this.set('filteredEditOptions', this.get('editOptions').filterProperty('type', type));
  }.observes('selected'),

  actions: {
    submitEdit: function() {
      console.log('SUBMIT EDIT');
      $('#edit-item-modal').modal('hide');
    },
    tabClick: function(text) {
      this.set('selected', text);
    },
    editOptionToggle: function(option) {
      var itemToEdit = this.get('order.itemToEdit');

      itemToEdit.toggleOption(option);
      option.set('checked', !option.get('checked'));
    }
  }
});
