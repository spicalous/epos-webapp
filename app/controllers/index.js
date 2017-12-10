import Controller from '@ember/controller';
import config from '../config/environment';

export default Controller.extend({
  name: config.APP.name,
  version: config.APP.version,

  actions: {

    onSaveError(callback) {
      this.send('showMessage', 'overlay', {
        header: 'Failed to save the setting :(',
        body: '',
        callback: callback,
      });
    }

  }
});
