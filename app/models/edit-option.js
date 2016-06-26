import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  editCategory: attr('number'),
  name: attr('string'),
  price: attr('number'),

  displayPrice: Ember.computed('price', function() {
    let price = this.get('price');
    return price === 0 ? '' : (price / 100).toFixed(2);
  })

});
