import Ember from 'ember';

export default Ember.Component.extend({

  observeAndUpdate: function() {
    let name = this.get('name');
    this.set('customer.name', name);
  }.observes('name'),
});
