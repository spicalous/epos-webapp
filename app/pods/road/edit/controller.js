import Ember from 'ember';

export default Ember.Controller.extend({

  validRoad: Ember.computed('model.name', function() {
    let road = this.get('model.name');
    return road && road.length > 1;
  }),

  editable: false,

  editDisabled: Ember.computed.not('editable'),

  saveDisabled: Ember.computed.not('canSave'),

  canSave: Ember.computed.and('model.hasDirtyAttributes', 'validRoad'),

  actions: {

    enableEdit() {
      this.set('editable', true);
    },

    disableEdit() {
      this.get('model').rollbackAttributes();
      this.set('editable', false);
    },

    saveEdit() {
      //trailing whitespace is not disregarded so we check that here
      let changedAttributes = this.get('model').changedAttributes();
      let hasChangedAfterTrimming = false;
      for (var attributes in changedAttributes) {
        let oldVal = changedAttributes[attributes][0];
        let newVal = changedAttributes[attributes][1];
        if (oldVal !== newVal.trim()) {
          hasChangedAfterTrimming = true;
        }
      }

      if (hasChangedAfterTrimming) {
        this.send('showMessage', 'loader', { message: 'Updating road name..' });
        this.get('model').save().then(() => {
          this.send('dismissMessage', 'loader');
          this.set('editable', false);
          this.send('showMessage', 'overlay', {
            header: 'Updated ^^',
            body: 'Road name updated successfully',
            callback: () => { this.transitionToRoute('road'); }
          });
        }).catch((response) => {
          this.send('dismissMessage', 'loader');
          this.send('showMessage', 'overlay', {
            header: 'Failed to update road name :(',
            body: response.errors[0].message
          });
        });
      } else {
        this.send('disableEdit');
      }
    },

    deleteRecord() {
      this.send('showMessage', 'loader', { message: 'Deleting road..' });
      this.get('model').destroyRecord().then(() => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Deleted ^^',
          body: 'Road deleted successfully',
          callback: () => { this.transitionToRoute('road'); }
        });
      }).catch((response) => {
        this.send('dismissMessage', 'loader');
        this.send('showMessage', 'overlay', {
          header: 'Failed to delete the road :(',
          body: response.errors[0].message
        });
      });
    },

    closeEdit() {
      this.transitionToRoute('road');
    }

  }

});
