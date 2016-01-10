import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type', 'data-toggle', 'data-target', 'data-dismiss'],
  type: 'button',
  classNameBindings: ['disabled'],
  classNames: ['btn'],

  confirmMessage: '',

  click() {
    if (!this.get('disabled')) {
      if (this.get('showMessage')) {
        let _this = this;
        this.sendAction('showMessage', 'confirm', {
          message: this.get('confirmMessage'),
          confirm: _this.get('confirmAction'),
          cancel: function() {
          }
        });
      } else {
        this.sendAction();
      }
    }
  }

});
