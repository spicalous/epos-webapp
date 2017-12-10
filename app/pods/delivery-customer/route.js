import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return {
      telephone: '',
      addressOne: '',
      addressTwo: '',
      postcode: ''
    }
  }
});
