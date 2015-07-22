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
      this.set('mainCategory', categories.objectAt(0).get('id'));

      switch(this.get('mainCategory')) {
        case "16":
          this.set('editItemTabs', this.get('drinkOptions'));
          this.set('selected', this.get('drinkOptions').objectAt(0));
          this.set('editItemOptions', this.get('addDrinkOptions'));
          break;
        default:
          this.set('editItemTabs', this.get('foodOptions'));
          this.set('selected', this.get('foodOptions').objectAt(0));
          this.set('editItemOptions', this.get('addFoodOptions'));
      }
    }
  }.observes('order.itemToEdit'),

  actions: {
    submitEdit: function() {
      console.log('SUBMIT EDIT');
      $('#edit-item-modal').modal('hide');
    },
    tabClick: function(text) {
      this.set('selected', text);

      switch(this.get('mainCategory')) {
        case "16":
          this.set('editItemOptions',
            text === 'Add Drink' ? this.get('addDrinkOptions') : this.get('editDrinkOptions'));
          break;
        default:
          this.set('editItemOptions',
            text === 'Add Food' ? this.get('addFoodOptions') : this.get('editFoodOptions'));
      }
    }
  }
});
