import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  quantity: attr('number'),
  menuItem: belongsTo('menu-item'),
  editOptions: hasMany('edit-option'),

  total: Ember.computed('quantity', 'menuItem', 'editOptions.[]', function() {
    return this.get('quantity') * (this.get('menuItem.price') + this.get('editOptionTotal'));
  }),

  editOptionTotal: Ember.computed('editOptions.[]', function() {
    return this.get('editOptions').reduce(function(prev, item) {
      return prev + item.get('price');
    }, 0);
  }),

  isMenuItem(menuItem) {
    return this.get('menuItem').get('id') === menuItem.get('id');
  },

  hasNoEditOptions() {
    return this.get('editOptions').get('length') === 0;
  }

});
