import Ember from 'ember';

export default Ember.Component.extend({

    willDestroy() {
      Ember.$(window).resize();
    },

    didInsertElement() {
      Ember.$(window).resize();
    }
});
