import Component from '@glimmer/component';
import { and, bool, not } from '@ember/object/computed';

export default class CustomerSelectComponent extends Component {

  @not('args.isEditable')
  isNotEditable;

  @bool('args.customer')
  hasCustomer;

  @and('hasCustomer', 'args.isEditable')
  showRemoveButton;
}
