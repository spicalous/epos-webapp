import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { MODIFIER_TYPES } from 'epos-webapp/models/order-modifier';

export default class OrderDetailsActionsComponent extends Component {

  @service ui;
  @service store;
  @tracked showOrderItems = false;
  @tracked showApplyOrderModifierModal = false;

  @action
  toggleShowOrderItems() {
    this.showOrderItems = !this.showOrderItems;
  }

  @action
  toggleApplyOrderModifierDialog() {
    this.showApplyOrderModifierModal = !this.showApplyOrderModifierModal;
  }

  @action
  async onApplyOrderModifier(type, value) {
    this.showApplyOrderModifierModal = false;

    let orderModifier = this.store.createRecord('order-modifier', { type, value: type === MODIFIER_TYPES.ABSOLUTE ? value * 100 : value });
    this.args.order.orderModifier = orderModifier;
    this.args.order.save()
      .then(() => this.ui.showToast('Successfully applied discount', 3900))
      .catch(e => {
        console.error('Failed to apply discount', e);
        orderModifier.unloadRecord();
        this.args.order.orderModifier = null;
        this.ui.showToast('Failed to apply discount', 3900);
      });
  }

  @action
  async removeDiscount() {
    let orderModifier = await this.args.order.orderModifier;
    this.args.order.orderModifier = null;
    this.args.order.save()
      .then(() => {
        orderModifier.deleteRecord();
        this.ui.showToast('Successfully removed discount', 3900);
      })
      .catch(e => {
        console.error('Failed to remove discount', e);
        this.args.order.orderModifier = orderModifier;
        this.ui.showToast('Failed to remove discount', 3900);
      });
  }

}
