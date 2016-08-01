import Ember from 'ember';

export default Ember.Controller.extend({

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
   * @type {MenuItem[]}
   * menu items sorted by ascending id
   */
  sortedMenu: Ember.computed.sort('model.menu', (x, y) => x.get('id') - y.get('id')),

  orderService: Ember.inject.service('order'),

  actions: {

    selectCategory(category) {
      this.set('selectedCategory', this.get('selectedCategory') === category ? null : category);
    },

    addMenuItem(menuItem) {
      this.get('orderService').add(menuItem);
      this.set('numpadValue', '');
      this.send('showMessage', 'toast', {
        body: 'Added ' + menuItem.get('name')
      });
    },
  }

});
