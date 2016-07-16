import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
    this.set('loading', true);
    this.store.findAll('table').then((tables) => {
      this.set('tables', tables);
      this.set('loading', false);
    });
  },

  actions: {

    cancel() {
      this.get('cancel')();
    }

  }
});
