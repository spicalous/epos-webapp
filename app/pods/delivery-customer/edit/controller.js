import Ember from 'ember';

export default Ember.Controller.extend({

  validTelephone: Ember.computed.not('model.invalidTelephone'),

  validAddress: Ember.computed.not('model.invalidAddress'),

  validPostcode: Ember.computed.not('model.invalidPostcode'),

  editable: false,

  editDisabled: Ember.computed.not('editable'),

  saveDisabled: Ember.computed.not('canSave'),

  canSave: Ember.computed.and('model.hasDirtyAttributes', 'validTelephone', 'validAddress', 'validPostcode'),

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

        this.send('showMessage', 'loader', { message: 'Updating customer..' });
        this.get('model').save().then(function() {
          _this.send('dismissMessage', 'loader');
          _this.set('editable', false);
          _this.send('showMessage', 'overlay', {
            header: 'Updated ^^',
            body: 'Customer updated successfully'
          });
        }).catch(function(response) {
          _this.send('dismissMessage', 'loader');
          _this.send('showMessage', 'overlay', {
            header: 'Failed to update the customer :(',
            body: response.errors[0].message
          });
        });
      } else {
        this.send('disableEdit');
      }
    },

    deleteRecord() {
      let _this = this;

      this.send('showMessage', 'loader', { message: 'Deleting customer..' });
      this.get('model').destroyRecord().then(function() {
        _this.send('dismissMessage', 'loader');
        _this.send('showMessage', 'overlay', {
          header: 'Deleted ^^',
          body: 'Customer deleted successfully',
          callback: function() {
            _this.transitionToRoute('deliveryCustomer');
          }
        });
      }).catch(function(response) {
        _this.send('dismissMessage', 'loader');
        _this.send('showMessage', 'overlay', {
          header: 'Failed to delete the customer :(',
          body: response.errors[0].message
        });
      });
    }

  }

});
