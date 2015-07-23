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

  editItemObserver: function() {
    var itemToEdit = this.get('order.itemToEdit');

    if (!itemToEdit) {
      return;
    }

    var editOptionsFromItem = itemToEdit.get('editOptions'),
        categories = itemToEdit.get('menuItem.categories');

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

  selectedTypeObserver: function() {
    var type = '';

    switch(this.get('selected')) {
      case 'Add Drink': type = 0;break;
      case 'Edit Drink': type = 1;break;
      case 'Add Food': type = 2;break;
      case 'Edit Food': type = 3;break;
    }

    var editOptions = this.get('editOptions');

    this.set('filteredEditOptions', editOptions.filterProperty('type', type));
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
      console.log(option);
    }
  }
});
