import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'li',
  click: function() {
    this.sendAction('editItem');
  }
});
