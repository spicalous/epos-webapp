import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
  import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  telephone: attr('string', { defaultValue: '' }),

  order: hasMany('order/eat-out'),

  invalidTelephone: Ember.computed('invalidTelephoneReason', function() {
    return !!this.get('invalidTelephoneReason');
  }),

  invalidTelephoneReason: Ember.computed('telephone', function() {
    let telephone = this.get('telephone');

    if (!telephone || !telephone.trim()) {
      return 'Telephone number required.';
    }
    if (telephone.length < 11) {
      return 'Telephone number is too short.';
    }
    if (telephone.length > 11) {
      return 'Telephone number is too long.';
    }
    return '';
  })

});
