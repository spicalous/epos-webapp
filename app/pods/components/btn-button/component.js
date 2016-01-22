import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type', 'data-toggle', 'data-target', 'data-dismiss'],
  type: 'button',
  classNameBindings: ['disabled'],
  classNames: ['btn'],

  confirmMessage: 'Are you sure?',
  messageToShow: 'confirm',

  click() {
    if (!this.get('disabled')) {
      if (this.get('showMessage')) {
        this.sendAction('showMessage', this.get('messageToShow'), {
          message: this.get('confirmMessage'),
          confirm: this.get('confirmAction'),
          cancel: function() {}
        });
      } else {
        this.sendAction();
      }
    }
  }

});
