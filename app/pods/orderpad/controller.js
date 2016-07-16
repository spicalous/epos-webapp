import Ember from 'ember';

export default Ember.Controller.extend({

  /**
   * @type {Customer}
   * @see {@link models/customer}
   */
  customer: null,

  /**
   * @type {Category}
   * @see {@link models/category}
   */
  selectedCategory: null,

  /**
   * used for filtering the menu
   * @type {string}
   */
  numpadValue: '',

  /**
   * @type {boolean}
   */
  showCustomerBrowser: false,

  /**
   * @type {boolean}
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

  estimatedTime: 45,

  /**
   * @type {MenuItem[]}
   * menu items sorted by ascending id
   */
  sortedMenu: Ember.computed.sort('model.menu', (x, y) => x.get('id') - y.get('id')),

  /**
   * computes the estimated time for delivery
   */
  computedEstimate: Ember.computed('estimatedTime', function() {
    return new Date(Date.now() + (this.get('estimatedTime') * 1000 * 60));
  }),

  validCustomer: Ember.computed('customer', 'customer.invalidTelephone',
      'customer.invalidAddress', 'customer.invalidPostcode', function() {

    let customer = this.get('customer');

    if (!customer) {
      return false;
    }
    return !customer.get('invalidTelephone') && !customer.get('invalidAddress') && !customer.get('invalidPostcode');
  }),

  emptyCustomer: Ember.computed.empty('customer'),

  cannotCancelOrder: Ember.computed.and('emptyCustomer', 'emptyOrder'),

  emptyOrder: Ember.computed.empty('model.order.orderItems'),

  invalidCustomer: Ember.computed.not('validCustomer'),

  invalidOrder: Ember.computed.or('emptyOrder', 'invalidCustomer'),

  createEatInOrder(baseOrder) {
    return this.store.createRecord('order/eatIn', {
      dateTime: new Date(),
      orderItems: baseOrder.get('orderItems'),
      paymentMethod: baseOrder.get('paymentMethod'),
      notes: baseOrder.get('notes'),
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

    selectMenuCategory(category) {
      let selectedCategory = this.get('selectedCategory');
      this.set('selectedCategory', selectedCategory === category ? null : category);
    },

    addMenuItem(menuItem) {
      this.get('model.order').addItem(menuItem);
      this.set('numpadValue', '');

      this.send('showMessage', 'toast', {
        body: 'Added ' + menuItem.get('name')
      });
    },

    selectTakeaway() {
      this.set('customer', this.store.createRecord('takeaway-customer'));
    },

    selectDelivery() {
      this.set('customer', this.store.createRecord('delivery-customer'));
      this.set('showCustomerBrowser', true);
    },

    selectEatIn() {
      this.set('showTableBrowser', true);
    },

    removeCustomer() {
      let customer = this.get('customer');

      if (customer && customer.get('id') === null) {
        customer.destroyRecord();
      }
      this.set('customer', null);
    },

    cancelTableBrowser() {
      this.send('removeCustomer');
      this.set('showTableBrowser', false);
    },

    cancelCustomerBrowser() {
      this.send('removeCustomer');
      this.set('showCustomerBrowser', false);
    },

    selectTable(table) {
      this.set('showTableBrowser', false);
      this.send('removeCustomer');
      this.set('customer', table);
    },

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

    submitOrder() {
      let modalWasOpen = Ember.$('#orderpad-modal').hasClass('in');
      let order = this.get('customer.constructor.modelName') === 'table' ?
        this.createEatInOrder(this.get('model.order')) :
        this.createEatOutOrder(this.get('model.order'));

      Ember.$('#orderpad-modal').modal('hide');
      this.send('showMessage', 'loader', { message: 'Sending order..' });

      order.save().then(() => {
        this.send('dismissMessage', 'loader');
        this.send('reset');
        this.send('showMessage', 'overlay', {
          header: 'Confirmed ^.^',
          body: 'Order submitted successfully',
          callback: () => {
            this.set('model.order', this.store.createRecord('order'));
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
      this.get('model.order').destroyRecord();
      this.set('model.order', this.store.createRecord('order'));
      this.send('showMessage', 'overlay', {
        header: 'Order Cancelled'
      });
    },

    reset() {
      this.send('removeCustomer');
      this.set('selectedCategory', '');
      this.set('numpadValue', '');
      this.set('deliveryCustomerResults', '');
      Ember.$('#orderpad-modal').modal('hide');
    }

  }
});
