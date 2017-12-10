import { helper } from '@ember/component/helper';

export function formatCurrency(params/*, hash*/) {
  return ((params[0] || 0) / 100).toFixed(2);
}

export default helper(formatCurrency);
