import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['app-setting'],

  onChange: Ember.observer('setting.value', function() {
    const setting = this.get('setting');

    setting.save()
      .catch(() => {
        setting.rollbackAttributes();
        this.get("onSaveError")();
      });
  })

});
