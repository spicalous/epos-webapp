import { helper } from '@ember/component/helper';

export function formatPaymentMethod(params/*, hash*/) {
  return params[0] || 'NOT PAID';
}

export default helper(formatPaymentMethod);
