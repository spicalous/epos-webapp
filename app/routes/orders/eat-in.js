import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import Ember from 'ember';
export default class OrdersEatInRoute extends Route {

  model() {
    return this.store.findAll('order/eat-in', {
      reload: true,
      include: 'orderItems.menuItem,orderItems.editOptions,orderModifier'
    });
  }

  @action
  willTransition(transition) {
    let scrollY = Ember.testing
      ? document.querySelector('#ember-testing-container').scrollTop
      : window.scrollY;

    this.savedYScrollPosition = transition.targetName === 'order.eat-in'
      ? scrollY
      : 0;
  }

  @action
  didTransition() {
    if (this.savedYScrollPosition) {
      scheduleOnce('afterRender', this, this.scrollToSavedYScrollPosition);
    }
  }

  scrollToSavedYScrollPosition() {
    if (Ember.testing) {
      document.querySelector('#ember-testing-container').scrollTop = this.savedYScrollPosition;
    } else {
      window.scroll(0, this.savedYScrollPosition);
    }
  }
}
