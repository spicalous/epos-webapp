import Ember from 'ember';

export default Ember.View.extend({
  /**
  *
  * Clears the timeout when another view replaces the toast
  */
  willDestroyElement: function() {
    clearTimeout(this.get('controller.id'));
  }
});
