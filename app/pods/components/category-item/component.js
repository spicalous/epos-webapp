import { observer } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  tagName: 'button',

  type: 'button',

  attributeBindings: ['type'],

  classNames: ['btn', 'btn-block', 'px-0'],

  classNameBindings: ['is-selected:btn-main:btn-main-secondary'],

  selectedObserver: observer('selected', function() {
    this.set('is-selected', this.get('selected') === this.get('category'));
  })

});
