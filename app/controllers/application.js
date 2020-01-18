import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    setToastMessage(message) {
      this.set('toastMessage', null);
      this.set('toastMessage', message);
    }
  }
});
