import Ember from 'ember';

export default Ember.Controller.extend({

  orderService: Ember.inject.service('order'),

  /**
   * @type {Category}
   * @see {@link models/category}
   */
  selectedCategory: null,

  /**
   * Used for filtering the menu
   * @type {String}
   */
  numpadValue: '',

  /**
   * An array of menu items filtered by category and number entered by the numpad
   * @type {MenuItem[]}
   */
  menuItems: Ember.computed('model.menu', 'selectedCategory', 'numpadValue', function() {
    const selectedCategory = this.get('selectedCategory');
    const numpadValue = this.get('numpadValue');
    let menuItems = this.get('model.menu');

    if (selectedCategory) {
      menuItems = menuItems.filter((item) =>
        item.get('categories').any((category) => selectedCategory === category));
    }
    if (numpadValue) {
      menuItems = menuItems.filter((item) => item.get('menuId').startsWith(numpadValue));
    }

    return menuItems;
  }),

  /**
   * Menu items sorted by ascending id
   * @type {MenuItem[]}
   */
  sortedMenu: Ember.computed.sort('menuItems', (x, y) => x.get('id') - y.get('id')),

  /**
   * Categories sorted by ascending id
   * @type {Category[]}
   */
  sortedCategories: Ember.computed.sort('model.categories', (x, y) => x.get('id') - y.get('id')),

  emptyCustomer: Ember.computed.empty('customer'),

  emptyOrder: Ember.computed.empty('orderService.items'),

  emptyCustomerAndOrder: Ember.computed.and('emptyCustomer', 'emptyOrder'),

  actions: {

    selectCategory(category) {
      this.set('selectedCategory', this.get('selectedCategory') === category ? null : category);
    },

    addMenuItem(menuItem) {
      this.get('orderService').add(menuItem);
      this.set('numpadValue', '');
      this.send('showToast', 'Added ' + menuItem.get('name'));
    },

    decrementOrderItem(orderItem) {
      this.get('orderService').decrement(orderItem);
    },

    onNumpadValueChange(value) {
      this.set('numpadValue', value);
    },

    confirmCancelOrder() {
      this.send('showMessage', 'confirm', {
        title: "Cancel order",
        message: "Are you sure you want to cancel?",
        confirm: () => this.send('cancelOrder')
      });
    },

    cancelOrder() {
      this.send('reset');
      this.send('showMessage', 'overlay', { header: 'Order Cancelled' });
    },

    reset() {
//      this.send('removeCustomer');
      this.get('orderService').clear();
      this.set('notes', null);
      this.set('paymentMethod', null);
      this.set('estimatedTime', 45);
      this.set('numpadValue', '');
      this.set('selectedCategory', null);
    }

  }
});
