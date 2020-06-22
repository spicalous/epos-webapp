import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CustomerSelectCustomerOnlineComponent extends Component {

  @action
  focusInput(element) {
    element.focus();
  }
}
