import Component from '@ember/component';

export default Component.extend({
  classNames: ['toast'],
  attributeBindings: ['role', 'ariaLive:aria-live', 'ariaAtomic:aria-atomic'],

  role: 'alert',

  ariaLive: 'assertive',

  ariaAtomic: 'true',

  didRender() {
    this._super(...arguments);
    this.$().toast('dispose');
    if (this.get('message')) {
      this.$().toast('show');
    }
  },

  willDestroyElement() {
    this.$().toast('dispose');
    this._super(...arguments);
  }

});
