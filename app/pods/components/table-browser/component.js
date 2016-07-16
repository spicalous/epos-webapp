import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    cancel() {
      this.get('cancel')();
    }

  }
});
