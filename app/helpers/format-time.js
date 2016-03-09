import Ember from 'ember';

export function minus(params/*, hash*/) {
  if (!params[0]) {
    return '';
  }
  if (typeof(params[0]) === 'string' || params[0] instanceof String) {
    params[0] = new Date(params[0]);
  }
  let hours = params[0].getHours();
  let mins = params[0].getMinutes();

  return (hours < 10 ? "0" + hours : hours) + ":" + (mins < 10 ? "0" + mins : mins);
}

export default Ember.Helper.helper(minus);
