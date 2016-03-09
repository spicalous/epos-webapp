import Ember from 'ember';

export function formatCurrency(params/*, hash*/) {
  return ((params[0] || 0) / 100).toFixed(2);
}

export default Ember.Helper.helper(formatCurrency);
