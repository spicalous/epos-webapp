import JSONAPISerializer from '@ember-data/serializer/json-api';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class OrderEatOutSerializer extends JSONAPISerializer.extend(EmbeddedRecordsMixin) {

  isEmbeddedRecordsMixinCompatible = true;

  attrs = {
    orderItems: {
      serialize: 'records',
      deserialize: 'ids'
    }
  };

}
