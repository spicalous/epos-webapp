import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { PAYMENT_METHODS } from './../../models/payment-method';

export default class OrderPaymentMethodUpdateButtonComponent extends Component {

  @service ui;

  paymentMethods = PAYMENT_METHODS;

  @action
  updatePaymentMethod(paymentMethod) {
    if (this.args.order.get('paymentMethod') !== paymentMethod) {
      this.args.order.set('paymentMethod', paymentMethod);
      this.args.order.save()
        .then(() => this.ui.showToast('Updated payment method', 3000))
        .catch((error) => {
          console.error('Failed to update payment method', error);
          this.args.order.rollbackAttributes();
          this.ui.showToast('Failed to update payment method', 3000);
        });
    }
  }

}
