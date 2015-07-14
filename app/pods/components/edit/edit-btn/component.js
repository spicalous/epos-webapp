import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'span',
  drinkOptions: Ember.A(['Edit Drink']),
  foodOptions: Ember.A(['Add Food', 'Edit Food']),
  desertOptions: Ember.A(['Add Desert', 'Edit Dessert']),
  editItemOptions: function() {
    var categories = this.get('orderItem')
                         .get('menuItem')
                         .get('categories');

    switch(categories.objectAt(0).get('id')) {
      case "16": return this.get('drinkOptions');
      default: return this.get('foodOptions');
    }
  }.property('categories'),
  actions: {
    editItem: function(option) {
      var orderItem = this.get('orderItem');

      console.log(option + ' ' + orderItem);
    }
  }
});
