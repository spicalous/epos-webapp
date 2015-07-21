import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['id'],
  id: 'edit-item-modal',
  classNames: ['modal', 'fade'],

  drinkOptions: Ember.A([
    'Add Drink', 'Edit Drink'
  ]),
  addDrinkOptions: Ember.A([
    'mixer'
  ]),
  editDrinkOptions: Ember.A([
    'more ice', 'less ice', 'no ice'
  ]),
  foodOptions: Ember.A([
    'Add Food', 'Edit Food'
  ]),
  addFoodOptions: Ember.A([
    'add chicken', 'add pork', 'add beef', 'add prawns', 'vegetarian'
  ]),
  editFoodOptions: Ember.A([
    'mild', 'spicy', 'peppers', 'no peppers', 'mushrooms', 'no mushrooms'
  ]),

  editItemObserver: function() {
    var categories = this.get('order.itemToEdit.menuItem.categories');

    if (categories) {
      switch(categories.objectAt(0).get('id')) {
        case "16":
          this.set('editItemTabs', this.get('drinkOptions'));
          this.set('editItemOptions', this.get('addDrinkOptions'));
          break;
        default:
          this.set('editItemTabs', this.get('foodOptions'));
          this.set('editItemOptions', this.get('addFoodOptions'));
      }
    }
  }.observes('order.itemToEdit'),

  actions: {
    submitEdit: function() {
      console.log('SUBMIT EDIT');
      $('#edit-item-modal').modal('hide');
    },
    cancelEdit: function() {
      console.log('CANCEL EDIT');
      $('#edit-item-modal').modal('hide');
    },
  }

});
