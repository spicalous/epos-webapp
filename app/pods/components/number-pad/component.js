import Component from '@ember/component';

export default Component.extend({

  defaultMaxLength: 5,

  value: '',

  actions: {

    numpadClick(value) {
      var oldVal = this.get('value'),
          maxLength = this.get('maxLength') ? this.get('maxLength') : this.get('defaultMaxLength');

      if (oldVal.length < maxLength) {
        this.get('onChange')(oldVal + value);
      }
    },

    numpadBackspace() {
      var oldVal = this.get('value');

      this.get('onChange')(oldVal.substring(0, oldVal.length - 1));
    },

    numpadClear() {
      this.get('onChange')('');
    }
  }
});
