import Ember from 'ember';

export default Ember.Service.extend({

  store: Ember.inject.service(),

  items: null,

  init() {
    this._super(...arguments);
    this.set('items', []);
  },

  add(menuItem) {
    let items = this.get('items');

    let orderItem = items.any(function(item) {
      if (item.isMenuItem(menuItem) && item.hasNoEditOptions()) {
        return item;
      }
    });

    if (orderItem) {
      orderItem.incrementProperty('quantity');
    } else {
      items.pushObject(this.get('store').createRecord('order-item', {
        quantity: 1,
        menuItem: menuItem
      }));
    }
  },

  setItems(items) {
    this.set('items', items);
  }

});
