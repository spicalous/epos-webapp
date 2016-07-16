import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['restaurant-table'],

  classNameBindings: ['status'],

  status: Ember.computed('table.status', function() {
    return this.get('table.status');
  }),

  isAvailable: Ember.computed('table.status', function() {
    return this.get('status') === 'AVAILABLE';
  }),

  actions: {

    selectTable() {
      this.get('onTableSelected')(this.get('table'));
    }

  }
});
