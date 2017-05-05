import Ember from 'ember';

export default Ember.Component.extend({

  classNameBindings: ['hasError'],

  labelCol: 'col-sm-2',

  inputCol: 'col-sm-9',

  helpCol: 'col-sm-offset-2 col-sm-9',

  didInsertElement() {
    this.$('input').focus();
  }

});
