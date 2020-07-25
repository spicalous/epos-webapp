import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DeliveryCustomersController extends Controller {

  @service ui;

  @action
  editCustomer(customer, onSuccessCallback) {
    customer.save()
      .then(() => {
        this.ui.showToast('Saved delivery customer record', 3900);
        onSuccessCallback();
      })
      .catch(error => {
        console.error('Failed to save customer/delivery', error);
        this.ui.showAppOverlay(
          'Failed to save customer :(',
          error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
      });
  }

  @action
  deleteCustomer(customer) {
    customer.destroyRecord()
      .then(() => this.ui.showToast('Deleted delivery customer record', 3900))
      .catch(error => {
        console.error('Failed to delete customer/delivery', error);
        this.ui.showAppOverlay(
          'Failed to delete customer :(',
          error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
      });
  }
}
