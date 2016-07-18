import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    transitionToIndex() {
      this.transitionToRoute('/');
    }

  }
});
