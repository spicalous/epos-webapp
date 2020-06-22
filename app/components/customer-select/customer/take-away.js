import Component from '@glimmer/component';
import { validate } from './../../../models/customer/take-away';

export default class CustomerSelectCustomerTakeAwayComponent extends Component {

  get invalidTakeAwayTelephoneReason() {
    return validate(this.args.customer.telephone);
  }

}
