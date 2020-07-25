import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { hash } from 'rsvp';
import Ember from 'ember';

export default class OrdersEatOutRoute extends Route {

  model() {
    return hash({
      orders: this.store.findAll('order/eat-out', {
        reload: true,
        include: 'orderItems.menuItem,orderItems.editOptions,customer,customer.deliveryCustomerTags'
      }),
      deliveryCustomerTags: this.store.findAll('delivery-customer-tag')
    });
  }

  @action
  willTransition(transition) {
    let scrollY = Ember.testing
      ? document.querySelector('#ember-testing-container').scrollTop
      : window.scrollY;

    this.savedYScrollPosition = transition.targetName === 'order.eat-out'
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
