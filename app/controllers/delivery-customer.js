import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DeliveryCustomerController extends Controller {

  @service ui;

  @action
  deleteCustomer(customer) {
    customer.destroyRecord()
      .then(() => this.ui.showToast('Deleted delivery customer record', 3900))
      .catch(error => {
        console.error('Failed to delete customer', error);
        this.ui.showAppOverlay(
          'Failed to delete customer :(',
          error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
      });
  }
}
