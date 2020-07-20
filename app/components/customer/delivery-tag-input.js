import Component from '@glimmer/component';
import { COLOURS } from './delivery-tag';
import { computed } from '@ember/object';
import { validate, PATTERN_STRING } from './../../models/delivery-customer-tag';

export default class CustomerDeliveryTagInputComponent extends Component {

  pattern = PATTERN_STRING;
  colours = Object.keys(COLOURS);

  @computed('args.name')
  get invalidFeedback() {
    return validate(this.args.name);
  }

}
