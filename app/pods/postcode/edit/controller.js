import Ember from 'ember';

export default Ember.Controller.extend({

  validPostcode: Ember.computed('model.postcode', function() {
    let postcode = this.get('model.postcode');
    return postcode && postcode.length > 1;
  }),

  editable: false,

  editDisabled: Ember.computed.not('editable'),

  saveDisabled: Ember.computed.not('canSave'),

  canSave: Ember.computed.and('model.hasDirtyAttributes', 'validPostcode'),

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
        let _this = this;

        this.send('showMessage', 'loader', { message: 'Updating postcode name..' });
        this.get('model').save().then(function() {
          _this.send('dismissMessage', 'loader');
          _this.set('editable', false);
          _this.send('showMessage', 'overlay', {
            header: 'Updated ^^',
            body: 'Postcode name updated successfully',
            callback: function() {
              _this.transitionToRoute('postcode');
            }
          });
        }).catch(function(response) {
          _this.send('dismissMessage', 'loader');
          _this.send('showMessage', 'overlay', {
            header: 'Failed to update postcode :(',
            body: response.errors[0].message
          });
        });
      } else {
        this.send('disableEdit');
      }
    },

    deleteRecord() {
      let _this = this;

      this.send('showMessage', 'loader', { message: 'Deleting postcode..' });
      this.get('model').destroyRecord().then(function() {
        _this.send('dismissMessage', 'loader');
        _this.send('showMessage', 'overlay', {
          header: 'Deleted ^^',
          body: 'Postcode deleted successfully',
          callback: function() {
            _this.transitionToRoute('postcode');
          }
        });
      }).catch(function(response) {
        _this.send('dismissMessage', 'loader');
        _this.send('showMessage', 'overlay', {
          header: 'Failed to delete the postcode :(',
          body: response.errors[0].message
        });
      });
    }
  }

});
