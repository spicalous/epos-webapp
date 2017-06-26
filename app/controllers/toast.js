import Ember from 'ember';

export default Ember.Controller.extend({

  messageObserver: Ember.observer('model.message', function() {
    Ember.run.debounce(this, 'dismissToast', 3000);
  }),

  dismissToast() {
    this.send('dismissMessage', 'toast');
  }

});
