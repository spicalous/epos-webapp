import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Indicates if this component should focus the input on insertion
   * @type {Boolean}
   */
  focus: false,

  didInsertElement() {
    if (this.get('focus')) {
      this.$('input').focus();
    }
  }

});
