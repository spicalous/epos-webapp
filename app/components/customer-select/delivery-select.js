import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { empty } from '@ember/object/computed';
import { validate } from './../../models/customer/delivery';

export default class CustomerSelectDeliverySelectComponent extends Component {

  @service ui;

  @tracked invalidCustomerReason = validate();

  @empty('invalidCustomerReason')
  validCustomer;

  @action
  onCustomerChange(telephone, addressOne, road, postcode) {
    this.invalidCustomerReason = validate(telephone, addressOne, road, postcode);
  }

}
