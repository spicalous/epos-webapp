import { helper } from '@ember/component/helper';

function getModelName(params/*, hash*/) {
  return params[0]
    && params[0].constructor
    && params[0].constructor.modelName;
}

export default helper(getModelName);
export { getModelName };
