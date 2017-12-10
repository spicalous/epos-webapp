import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  telephone: attr('string', { defaultValue: '' }),

  invalidTelephone: computed('invalidTelephoneReason', function() {
    return !!this.get('invalidTelephoneReason');
  }),

  invalidTelephoneReason: computed('telephone', function() {
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
