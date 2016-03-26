import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['list-group-item'],

  actions: {
    printOrder() {
      let id = this.get('order.id');
      this.get('onPrintOrder')(id);
    }
  }
});
