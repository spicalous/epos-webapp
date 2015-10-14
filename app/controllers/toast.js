import Ember from 'ember';

export default Ember.Controller.extend({

  messageObserver: function() {
    Ember.run.debounce(this, 'dismissToast', 2000);
  }.observes('model.body'),

  dismissToast() {
    this.send('dismissMessage', 'toast');
  }

});
