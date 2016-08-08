import Ember from 'ember';

export default Ember.Controller.extend({

  orderService: Ember.inject.service('order'),

  orderModalId: 'order-edit-eat-out__order-modal',

  orderModalSelector: Ember.computed('orderModalId', function() {
    return '#' + this.get('orderModalId');
  }),

  /**
   * @type {Array[]}
   */
  paymentMethods: [null, 'CASH', 'CARD', 'ONLINE'],

  /**
   * @type {Number[]}
   */
  estimatedTimes: [20, 25, 30, 35, 40, 45, 50, 55, 60, 70],

  /**
   * Computes the estimated time for delivery
   * @type {Date}
   */
  computedEstimate: Ember.computed('model.estimatedTime', function() {
    return new Date(Date.now() + (this.get('model.estimatedTime') * 1000 * 60));
  }),

  actions: {

    editItem(orderItem) {
      this.set('itemToEdit', orderItem);
    },

    decrementItem(orderItem) {
      this.get('orderService').decrement(orderItem);
    },

    showConfirmEdit() {
      Ember.$(this.get('orderModalSelector')).modal('hide');
      this.set('showConfirmEdit', true);
      Ember.run.scheduleOnce('afterRender', this, () => Ember.$(window).resize());
    },

    hideConfirmEdit() {
      this.set('showConfirmEdit', false);
    },

    submitConfirmEdit() {
      this.send('showMessage', 'loader', { message: 'Sending order..' });

      this.get('model').save().then(() => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Confirmed ^.^',
          body: 'Order edited successfully',
          callback: () => {
            this.send('hideConfirmEdit');
            this.transitionToRoute('order.view');
          }
        });

        // TODO: work around to remove order items with null ids from the store after being saved
        this.store.peekAll('order-item').filterBy('id', null).invoke('destroyRecord');

      }, (response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Failed :(',
          body: response.errors[0].message
        });
      });
    },

    cancelEdit() {
      this.get('model').rollbackAttributes();
      this.get('orderService').invokeRollback();
      this.get('orderService').clear();
      this.transitionToRoute('order.view');
    }

  }
});
