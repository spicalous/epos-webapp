import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['type', 'data-toggle', 'data-target', 'data-dismiss'],
  type: 'button',
  classNameBindings: ['disabled'],
  classNames: ['btn'],

  /**
   *  This flag is used to display a confirmation in the application
   *  Using this flag assumes that the current controller has a "showConfirm" action
   *  that sends an action to the application route to show the confirm
   *  the consumer must also set the target of the button to the controller to ensure
   *  that sending the action is handled by the controller
   */
  displayConfirm: false,

  /** Message to display on the confirm */
  confirmMessage: '',

  click() {
    if (!this.get('disabled')) {
      if (this.get('displayConfirm')) {
        this.send("showConfirm", this.get('confirmMessage'), this.get('action'));
      } else {
        this.sendAction();
      }
    }
  }

});
