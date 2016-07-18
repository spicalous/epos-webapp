import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['restaurant-table'],

  classNameBindings: ['status'],

  displayStatus: Ember.computed('table.status', function() {
    return this.get('table.status').replace('_', ' ');
  }),

  isAvailable: Ember.computed('table.status', function() {
    return this.get('table.status') === 'AVAILABLE';
  }),

  isOccupied: Ember.computed('table.status', function() {
    return this.get('table.status') === 'OCCUPIED';
  }),

  actions: {

    selectTable() {
      this.get('onTableSelected')(this.get('table'));
    },

    viewOrder() {

    },

    requestPayment() {

    },

    completeOrder() {

    }

  }
});
