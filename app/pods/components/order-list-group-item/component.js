import Ember from 'ember';
import { ReceiptType } from '../../../models/receipt-type';

export default Ember.Component.extend({

  tagName: 'div',

  classNames: ['list-group-item'],

  showOrderItems: false,

  /**
   *  customer.constructor.modelName (store.createRecord)
   *  customer.content.constructor.modelName (store.findRecord)
   */
  customerType: Ember.computed('order.customer', function() {
    return this.get('order.customer.constructor.modelName') || this.get('order.customer.content.constructor.modelName');
  }),

  orderType: Ember.computed('order', function() {
    return this.get('order.constructor.modelName');
  }),

  actions: {

    editOrder() {
      this.get('onEditOrder')(this.get('order.id'));
    },

    toggleShowOrderItems() {
      this.toggleProperty('showOrderItems');
    },

    printOrderAsEatIn() {
      let id = this.get('order.id');
      let orderType = this.get('orderType');

      this.get('onPrintOrder')(id, orderType, ReceiptType.EAT_IN);
    },

    printOrderAsDelivery() {
      let id = this.get('order.id');
      let orderType = this.get('orderType');

      this.get('onPrintOrder')(id, orderType, ReceiptType.DELIVERY);
    }
  }
});
