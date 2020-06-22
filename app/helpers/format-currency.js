import { helper } from '@ember/component/helper';

export default helper(function formatCurrency(params/*, hash*/) {
  return ((params[0] || 0) / 100).toFixed(2);
});
