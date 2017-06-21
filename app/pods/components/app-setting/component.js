import Ember from 'ember';

export default Ember.Component.extend({

  settingOneClass: Ember.computed('setting.value', function() {
    return this.get('setting.value') === 1 ? 'active' : '';
  }),

  settingTwoClass: Ember.computed('setting.value', function() {
    return this.get('setting.value') === 2 ? 'active' : '';
  }),

  settingThreeClass: Ember.computed('setting.value', function() {
    return this.get('setting.value') === 3 ? 'active' : '';
  }),

  actions: {

    setSetting(value) {
      const setting = this.get('setting');
      const old = setting.get('value');

      if (old !== value) {
        setting.set('value', value);
        setting.save()
          .catch(() => {
            setting.rollbackAttributes();
            this.get("onSaveError")();
          });
      }
    }
  }
});
