import Ember from 'ember';

export default Ember.Controller.extend({

  messageObserver: function() {
    var _this = this;

    clearTimeout(this.get('id'));

    this.set('id', setTimeout(function() {
      _this.send('dismissMessage');
    }, 2000));

  }.observes('model.message')
});
