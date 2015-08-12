import Ember from 'ember';

export default Ember.Controller.extend({

  messageObserver: function() {
    var id = this.get('id'),
        _this = this;

    if (id) {
      clearTimeout(id);
    }

    this.set('id', setTimeout(function() {
      _this.send('dismissMessage');
    }, 2000));

  }.observes('model.message')
});
