import { helper } from '@ember/component/helper';

export default helper(function formatPaymentMethod(params/*, hash*/) {
  return params[0] || 'NOT PAID';
});
