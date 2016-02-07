import Ember from "ember";

export default Ember.Helper.helper(function([ opOne, opTwo ]) {
  return opOne - opTwo;
});
