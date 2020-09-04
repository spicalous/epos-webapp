import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action, computed, set } from '@ember/object';
import formatCurrency from 'epos-webapp/helpers/format-currency';

export default class MenuItemCardComponent extends Component {

  @service store;
  @service ui;

  @tracked editing = false;
  @tracked inputPrice;

  @computed('args.menuItem.price')
  get displayPrice() {
    return formatCurrency.compute([this.args.menuItem.price]);
  }

  @computed('inputPrice')
  get validPrice() {
    return 0 <= Number.parseFloat(this.inputPrice);
  }

  @action
  startEditing() {
    set(this, 'inputPrice', this.displayPrice);
    this.editing = true;
  }

  @action
  cancelEditing() {
    this.args.menuItem.rollbackAttributes();
    this.editing = false;
  }

  @action
  save() {
    this.args.menuItem.price = Number.parseInt(this.inputPrice * 100);
    this.args.menuItem.save()
      .then(() => {
        this.ui.showToast('Updated menu item', 3900);
        this.editing = false;
      })
      .catch(error => {
        console.error('Failed to update menu-item', error);
        this.ui.showAppOverlay(
          'Failed to update menu item :(',
          error && error.errors && error.errors[0] && error.errors[0].detail || error.message || 'Unknown error');
      });
  }

  willDestroy() {
    this.cancelEditing();
    super.willDestroy(...arguments);
  }
}
