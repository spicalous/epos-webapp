import { helper } from '@ember/component/helper';

export default helper(function contains(params) {
  let array = params[0] || [];
  let item = params[1];
  return -1 < array.indexOf(item);
});
