import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    toggle() {
      this.$('[data-toggle="dropdown"]').dropdown();
    }
  }

});
