import Ember from 'ember';

export default Ember.Controller.extend({

  messageObserver: Ember.observer('model.body', function() {
    Ember.run.debounce(this, 'dismissToast', 2000);
  }),

  dismissToast() {
    this.send('dismissMessage', 'toast');
  }

});
