import Ember from 'ember';

export function contains(params/*, hash*/) {
  let array = params[0] || [];
  let item = params[1];
  return -1 < array.indexOf(item);
}

export default Ember.Helper.helper(contains);
