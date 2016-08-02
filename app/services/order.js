import Ember from 'ember';

export default Ember.Service.extend({

  store: Ember.inject.service(),

  items: null,

  deletedItems: null,

  init() {
    this._super(...arguments);
    this.set('items', []);
    this.set('deletedItems', []);
  },

  total: Ember.computed('items.@each.quantity', 'items.@each.total', function() {
    return this.get('items').reduce((prev, item) => prev + item.get('total'), 0);
  }),

  size: Ember.computed('items.@each.quantity', function() {
    return this.get('items').reduce((prev, item) => prev + item.get('quantity'), 0);
  }),

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

  decrement(item) {
    if (2 < item.get('quantity')) {
      item.decrementProperty('quantity');
    } else {
      item.deleteRecord();
      this.get('items').removeObject(item);
      this.get('deletedItems').pushObject(item);
    }
  },

  setItems(items) {
    this.set('items', items);
    this.get('deletedItems').clear();
  },

  clear() {
    this.get('items').clear();
    this.get('deletedItems').clear();
  },

  invokeRollback() {
    this.get('items').invoke('rollbackAttributes');
    this.get('deletedItems').invoke('rollbackAttributes');
  }

});
