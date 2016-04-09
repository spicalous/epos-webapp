import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    selectCategory(category) {
      this.get('onCategorySelected')(category);
    }

  }

});
