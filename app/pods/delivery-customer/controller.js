import Ember from 'ember';

export default Ember.Controller.extend({

  editDisabled: Ember.computed.not('editable'),

  saveDisabled: Ember.computed.not('canSave'),

  canSave: Ember.computed.and('model.hasDirtyAttributes', 'hasNonEmptyFields'),

  hasNonEmptyFields: Ember.computed('model.contactNumber', 'model.address', 'model.postcode', function() {
    let model = this.get('model');
    return !!model.get('contactNumber') && !!model.get('address') && !!model.get('postcode');
  }),

  editable: false,

  actions: {

    enableEdit() {
      this.set('editable', true);
    },

    disableEdit() {
      this.get('model').rollbackAttributes();
      this.set('editable', false);
    },

    saveEdit() {
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

        this.get('model').save().then(function() {
          _this.set('editable', false);
        }).catch(function() {

        });
      } else {
        this.send('disableEdit');
      }
    }
  }

});
