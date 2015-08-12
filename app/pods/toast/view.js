import Ember from 'ember';

export default Ember.View.extend({
  willDestroyElement: function() {
    clearTimeout(this.get('controller.id'));
  }
});
