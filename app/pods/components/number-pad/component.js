import Ember from 'ember';

export default Ember.Component.extend({

  defaultMaxLength: 5,

  value: '',

  actions: {

    numpadClick(value) {
      var oldVal = this.get('value'),
          maxLength = this.get('maxLength') ? this.get('maxLength') : this.get('defaultMaxLength');

      if (oldVal.length < maxLength) {
        this.set('value', oldVal + value);
      }
    },

    numpadBackspace() {
      var oldVal = this.get('value');

      this.set('value', oldVal.substring(0, oldVal.length - 1));
    },

    numpadClear() {
      this.set('value', '');
    }
  }
});
