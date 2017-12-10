import { helper } from '@ember/component/helper';

export function minus(params/*, hash*/) {
  return params[0] - params[1];
}

export default helper(minus);
