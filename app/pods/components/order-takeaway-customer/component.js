import Ember from 'ember';

export default Ember.Component.extend({

  customerDetails: Ember.computed('customer', function() {
    let customer = this.get('customer');
    let name = customer.get('name') || 'TAKEAWAY';
    let telephone = customer.get('telephone');

    return telephone ?
       name + ' ' + telephone :
       name;
  })

});
