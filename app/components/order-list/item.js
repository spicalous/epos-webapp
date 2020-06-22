import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class OrderListItemComponent extends Component {

  @tracked
  showOrderItems = false;

  @action
  toggleShowOrderItems() {
    this.showOrderItems = !this.showOrderItems;
  }

}
