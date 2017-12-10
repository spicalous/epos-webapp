import { debounce } from '@ember/runloop';
import { observer } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({

  DEBOUNCE_MS: 3000,

  messageObserver: observer('model.message', function() {
    debounce(this, 'dismissToast', this.DEBOUNCE_MS);
  }),

  dismissToast() {
    this.send('dismissMessage', 'toast');
  }

});
