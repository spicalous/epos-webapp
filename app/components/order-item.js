import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OrderItemComponent extends Component {

  @service ui;

  @tracked
  expanded = false;

  @tracked
  editing = false;

  @action
  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  @action
  decrement(event) {
    event.stopPropagation();
    this.args.onDecrement(this.args.item);
  }

  @action
  increment(event) {
    event.stopPropagation();
    this.args.item.incrementProperty('quantity');
  }

  @action
  edit(event) {
    event.stopPropagation();
    this.editing = true;
  }

  @action
  stopEditing() {
    this.editing = false;
  }
}
