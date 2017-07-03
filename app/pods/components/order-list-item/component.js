import Ember from 'ember';
import { RECEIPT_TYPE } from '../../../models/receipt-type';

export default Ember.Component.extend({

  tagName: 'li',

  classNames: ['list-group-item'],

  showOrderItems: false,

  showPaymentSelector: false,

  updatingPaymentMethod: false,

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

    showPaymentSelector() {
      this.set('showPaymentSelector', true);
    },

    hidePaymentSelector() {
      this.set('showPaymentSelector', false);
    },

    updatePayment(paymentMethod) {
      let order = this.get('order');
      order.set('paymentMethod', paymentMethod);

      this.set('updatingPaymentMethod', true);
      order.save().then(() => {
        this.set('updatingPaymentMethod', false);
        this.set('showPaymentSelector', false);
      })
      .catch(() => {
        order.rollbackAttributes();
        this.set('updatingPaymentMethod', false);
      });
    },

    editOrder() {
      this.get('onEditOrder')(this.get('order.id'));
    },

    toggleShowOrderItems() {
      this.toggleProperty('showOrderItems');
    },

    printOrderAsEatIn() {
      let id = this.get('order.id');
      let orderType = this.get('orderType');

      this.get('onPrintOrder')(id, orderType, RECEIPT_TYPE.EAT_IN);
    },

    printOrderAsDelivery() {
      let id = this.get('order.id');
      let orderType = this.get('orderType');

      this.get('onPrintOrder')(id, orderType, RECEIPT_TYPE.DELIVERY);
    }
  }
});
