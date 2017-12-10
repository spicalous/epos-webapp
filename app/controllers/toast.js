import { debounce } from '@ember/runloop';
import { observer } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({

  messageObserver: observer('model.message', function() {
    debounce(this, 'dismissToast', 3000);
  }),

  dismissToast() {
    this.send('dismissMessage', 'toast');
  }

});
