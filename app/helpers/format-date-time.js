import Ember from 'ember';
import { formatTime } from './format-time';

export function formatDateTime(params/*, hash*/) {
  if (!params[0]) {
    return '';
  }
  if (typeof(params[0]) === 'string' || params[0] instanceof String) {
    params[0] = new Date(params[0]);
  }
  return formatTime([params[0]]) + ' - ' + params[0].toLocaleDateString();

}

export default Ember.Helper.helper(formatDateTime);
