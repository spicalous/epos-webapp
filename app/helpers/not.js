import { isArray } from '@ember/array';
import { helper } from '@ember/component/helper';

export default helper(function not(params) {
  for (let i = 0; i < params.length; i++) {
    let val = isArray(params[i]) ? params[i].length : params[i];
    if (val) {
      return false;
    }
  }
  return true;
});
