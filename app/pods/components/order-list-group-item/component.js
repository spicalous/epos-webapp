import Ember from 'ember';
import { ReceiptType } from '../../../models/receipt-type';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['list-group-item'],

  actions: {

    printOrderAsEatIn() {
      let id = this.get('order.id');
      this.get('onPrintOrder')(id, ReceiptType.EAT_IN);
    },

    printOrderAsDelivery() {
      let id = this.get('order.id');
      this.get('onPrintOrder')(id, ReceiptType.DELIVERY);
    }
  }
});
