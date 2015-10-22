import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  editCategory: DS.attr('number'),
  name: DS.attr('string'),
  price: DS.attr('number'),

  displayPrice: Ember.computed('price', function() {
    return this.get('price') === 0 ? '' : (this.get('price') / 100).toFixed(2);
  })

});
