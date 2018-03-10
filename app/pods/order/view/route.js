import $ from 'jquery';
import Route from '@ember/routing/route';
import { scheduleOnce } from '@ember/runloop';

export default Route.extend({

  model() {
    // TODO: replace with proper solution
    // unload all items we save implicitly when sending an order to the back end so the store can start fresh
    this.store.unloadAll('takeaway-customer');

    return this.store.findAll('order/eat-out', { reload: true });
  },

  _getScrollPosition() {
    return $(window).scrollTop()
  },

  actions: {

    /**
     * Save the current scroll position if we're transitioning to edit an order, otherwise reset
     */
    willTransition(transition) {
      this.set('currentScrollPosition', transition.targetName === "order.edit.eat-out" ? this._getScrollPosition() : 0);
    },

    didTransition() {
      this._super(...arguments);

      const scrollPosition = this.get('currentScrollPosition');

      if (scrollPosition) {

        function adjustScrollPosition() {
          $(window).scrollTop(scrollPosition);
        }

        scheduleOnce('afterRender', this, adjustScrollPosition);
      }
    }

  }
});
