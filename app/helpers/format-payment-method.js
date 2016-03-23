import Ember from 'ember';

export function formatPaymentMethod(params/*, hash*/) {
  return params[0] || 'NOT PAID';
}

export default Ember.Helper.helper(formatPaymentMethod);
