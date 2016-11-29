import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['app-setting'],

  actions: {

    toggleSetting() {
      const setting = this.get('setting');
      setting.toggleProperty('value');

      setting.save()
        .catch(() => {
          setting.rollbackAttributes();
          this.get("onSaveError")();
        });
    }
  }
});
