import ButtonDefault from '../btn-default/component';

export default ButtonDefault.extend({

  /**
   * @type {string} confirm message to be displayed on the dialog
   */
  message: 'Are you sure?',

  /**
   * @type {function} callback onConfirm
   */
  confirm: function() {},

  /**
   * @type {function} callback onCancel
   */
  cancel: function() {},

  click() {
    if (!this.get('disabled')) {
      this.sendAction('showMessage', 'confirm', {
        message: this.get('message'),
        confirm: this.get('confirm'),
        cancel: this.get('cancel')
      });
    }
  }

});
