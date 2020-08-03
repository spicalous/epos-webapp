import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';

export default class OrderEatOutController extends Controller {

  @service store;

  @action
  unloadStoreAndTransition() {
    this.store.unloadAll();
    next(this, function() {
      this.transitionToRoute('orders.eat-in');
    });
  }

  @action
  transitionToOrdersEatIn() {
    this.transitionToRoute('orders.eat-in');
  }
}
