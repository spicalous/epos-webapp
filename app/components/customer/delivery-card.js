import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { validate } from './../../models/customer/delivery';

export default class CustomerDeliveryCardComponent extends Component {

  @tracked editing = false;
  @tracked invalidReason = '';

  @computed('invalidReason','args.customer.hasDirtyAttributes')
  get canSave() {
    return !this.invalidReason && this.args.customer.get('hasDirtyAttributes');
  }

  @action
  startEditing() {
    this.editing = true;
  }

  @action
  cancelEditing() {
    this.args.customer.rollbackAttributes();
    this.invalidReason = '';
    this.editing = false;
  }

  @action
  onChange(telephone, addressOne, road, postcode) {
    telephone = telephone ? telephone.trim() : '';
    addressOne = addressOne ? addressOne.trim() : '';
    road = road ? road.trim() : '';
    postcode = postcode ? postcode.trim() : '';
    this.invalidReason = validate(telephone, addressOne, road, postcode);
    this.args.customer.set('telephone', telephone);
    this.args.customer.set('addressOne', addressOne);
    this.args.customer.set('road', road);
    this.args.customer.set('postcode', postcode);
  }

  @action
  onEdit() {
    this.args.onEdit(this.args.customer, () => {
      this.editing = false;
    });
  }

  willDestroy() {
    this.args.customer.rollbackAttributes();
    super.willDestroy(...arguments);
  }

}
