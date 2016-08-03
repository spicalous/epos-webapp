import Ember from 'ember';

export default Ember.Controller.extend({

  orderService: Ember.inject.service('order'),

  orderModalId: 'order-edit__create-order-modal',

  /**
   * @type {Customer}
   * @see {@link models/customer}
   */
  customer: null,

  /**
   * @type {Boolean}
   */
  showCustomerBrowser: false,

  /**
   * @type {Boolean}
   */
  showTableBrowser: false,

  /**
   * @type {Array[]}
   */
  paymentMethods: [null, 'CASH', 'CARD', 'ONLINE'],

  /**
   * @type {Number[]}
   */
  estimatedTimes: [20, 25, 30, 35, 40, 45, 50, 55, 60, 70],

  /**
   * Customer payment method
   * @type {null|String}
   */
   paymentMethod: null,

  /**
   * Time in minutes for delivery estimate
   * @type {Number}
   */
  estimatedTime: 45,

  /**
   * List of tables and status' in the restaurant
   * @type {Table[]}
   */
  tables: null,

  /**
   * Computes the estimated time for delivery
   * @type {Date}
   */
  computedEstimate: Ember.computed('estimatedTime', function() {
    return new Date(Date.now() + (this.get('estimatedTime') * 1000 * 60));
  }),

  /**
   * Aggregate boolean value for the validity of the customer (only applies to delivery
   * and takeaway customers
   * @type {Boolean}
   */
  validCustomer: Ember.computed('customer', 'customer.invalidTelephone',
      'customer.invalidAddress', 'customer.invalidPostcode', function() {

    let customer = this.get('customer');
    return customer && !customer.get('invalidTelephone') &&
        !customer.get('invalidAddress') && !customer.get('invalidPostcode');
  }),

  emptyCustomer: Ember.computed.empty('customer'),

  cannotCancelOrder: Ember.computed.and('emptyCustomer', 'emptyOrder'),

  emptyOrder: Ember.computed.empty('orderService.items'),

  invalidCustomer: Ember.computed.not('validCustomer'),

  invalidOrder: Ember.computed.or('emptyOrder', 'invalidCustomer'),

  createEatInOrder() {
    return this.store.createRecord('order/eatIn', {
      dateTime: new Date(),
      orderItems: this.get('orderService.items'),
      paymentMethod: this.get('paymentMethod'),
      notes: this.get('notes'),
      table: this.get('customer'),
    });
  },

  createEatOutOrder(baseOrder) {
    return this.store.createRecord('order/eatOut', {
      dateTime: new Date(),
      orderItems: baseOrder.get('orderItems'),
      paymentMethod: baseOrder.get('paymentMethod'),
      notes: baseOrder.get('notes'),
      customer: this.get('customer'),
      estimatedTime: this.get('estimatedTime'),
    });
  },

  actions: {

    /**
     * Sets the customer to take away
     */
    setNewTakeawayCustomer() {
      this.set('customer', this.store.createRecord('takeaway-customer'));
    },

    /**
     * Shows the customer browser on selecting delivery customer
     */
    showCustomerBrowser() {
      this.set('customer', this.store.createRecord('delivery-customer'));
      this.set('showCustomerBrowser', true);
    },

    /**
     * Dismisses the customer browser and removes the customer
     */
    cancelCustomerBrowser() {
      this.send('removeCustomer');
      this.set('showCustomerBrowser', false);
    },

    /**
     * Shows the table browser on selecting eat in customer
     */
    showTableBrowser() {
      this.set('tables', this.store.findAll('table'));
      this.set('showTableBrowser', true);
    },

    /**
     * Dismisses the table browser and removes the customer
     */
    cancelTableBrowser() {
      this.send('removeCustomer');
      this.set('showTableBrowser', false);
    },

    /**
     * Removes the currently selected customer
     */
    removeCustomer() {
      let customer = this.get('customer');

      if (customer && customer.get('id') === null) {
        customer.destroyRecord();
      }
      this.set('customer', null);
    },

    /**
     * Sets the selected table as the customer
     * @param {Table} table - table to be set as the customer
     */
    selectTable(table) {
      this.set('showTableBrowser', false);
      this.send('removeCustomer');
      this.set('customer', table);
    },

    /**
     * Sets the selected delivery customer as the customer
     * @param {DeliveryCustomer} deliveryCustomer - delivery customer to be set as the
     *                                              customer
     */
    selectDeliveryCustomer(deliveryCustomer) {
      this.set('showCustomerBrowser', false);
      this.send('removeCustomer');
      this.set('customer', deliveryCustomer);
    },

    saveAndSelectCustomer() {
      let customer = this.get('customer');

      this.send('showMessage', 'loader', { message: 'Saving customer..' });

      customer.save().then(() => {
        this.send('dismissMessage', 'loader');
        this.set('showCustomerBrowser', false);
        this.send('showMessage', 'toast', {
          body: 'Customer saved successfully'
        });
      }).catch((response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Failed to save :(',
          body: response.errors[0].message
        });
      });
    },


    /**
     * Sets the current order item to edit
     * @param {OrderItem} orderItem - the order item to edit
     */
    editItem(orderItem) {
      this.set('itemToEdit', orderItem);
    },

    /**
     * Decrements the quantity of the order item via the order service
     * @param {OrderItem} orderItem - the order item to edit
     */
    decrementItem(orderItem) {
      this.get('orderService').decrement(orderItem);
    },

    showConfirmOrder() {
      this.set('showConfirmOrder', true);
    },

    hideConfirmOrder() {
      this.set('showConfirmOrder', false);
    },

    submitOrder() {
      let modalWasOpen = Ember.$('#orderpad-modal').hasClass('in');
      let order = this.get('customer.constructor.modelName') === 'table' ?
        this.createEatInOrder() :
        this.createEatOutOrder();

      Ember.$('#orderpad-modal').modal('hide');
      this.send('showMessage', 'loader', { message: 'Sending order..' });

      order.save().then(() => {
        this.send('dismissMessage', 'loader');
        this.send('reset');
        this.send('showMessage', 'overlay', {
          header: 'Confirmed ^.^',
          body: 'Order submitted successfully',
          callback: () => {
            this.send('hideConfirmOrder');
          }
        });

        // TODO: work around to remove order items with null ids from the store after being saved
        this.store.peekAll('order-item').filterBy('id', null).invoke('destroyRecord');

      }, (response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Failed :(',
          body: response.errors[0].message,
          callback: () => {
            if (modalWasOpen) {
              Ember.$('#orderpad-modal').modal('show');
            }
          }
        });
      });
    },

    cancelOrder() {
      this.send('reset');
      this.send('showMessage', 'overlay', {
        header: 'Order Cancelled'
      });
    },

    reset() {
      this.send('removeCustomer');
      this.get('orderService').clear();
      this.set('deliveryCustomerResults', '');
      Ember.$('#orderpad-modal').modal('hide');
    }
  }
});
