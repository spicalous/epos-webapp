import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  settingOneClass: computed('setting.value', function() {
    return this.get('setting.value') === 0 ? 'active' : '';
  }),

  settingTwoClass: computed('setting.value', function() {
    return this.get('setting.value') === 1 ? 'active' : '';
  }),

  settingThreeClass: computed('setting.value', function() {
    return this.get('setting.value') === 2 ? 'active' : '';
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
