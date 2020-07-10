import { Collection } from 'ember-cli-mirage';

let tableIdCounter = 1;

export default function() {
  this.namespace = 'EPOSDataService/api';
  this.get('/settings');
  this.patch('/settings/:id');
  this.get('/categories');
  this.get('/edit-categories');
  this.get('/edit-options');
  this.get('/menu-items');
  this.get('/order/eat-ins', 'order/eatIns');
  this.post('/order/eat-ins', function(schema) {
    let attrs = this.normalizedRequestAttrs('order/eat-in');
    attrs.tableId = 'ABC' + tableIdCounter++;
    return schema['order/eatIns'].create(attrs);
  });
  this.get('/order/eat-outs', 'order/eatOuts');
  this.get('/order/eat-outs/:id', 'order/eatOuts');
  this.post('/order/eat-outs', function(schema, request) {
    let attrs = this.normalizedRequestAttrs('order/eat-out');
    attrs.orderItemIds = [];
    let body = JSON.parse(request.requestBody);
    body.data['order-items'].forEach(item => {
      let orderItem = schema.orderItems.create({
        quantity: item.data.attributes.quantity,
        menuItemId: item.data.relationships['menu-item'].data.id,
        editOptionIds: item.data.relationships['edit-options']
          ? item.data.relationships['edit-options'].data.map(editOptionRelationship => editOptionRelationship.id)
          : []
      });
      attrs.orderItemIds.push(orderItem.id);
    });
    if (body.data.customer.data.id) {
      attrs.customerId = { id: body.data.customer.data.id, type: body.data.customer.data.type };
    } else {
      if (body.data.customer.data.type === 'customer/take-aways') {
        let customer = schema['customer/takeAways'].create({
          telephone: body.data.customer.data.attributes.telephone,
          name: body.data.customer.data.attributes.name
        });
        attrs.customerId = { id: customer.id, type: 'customer/take-away'};
      }
      if (body.data.customer.data.type === 'customer/onlines') {
        let customer = schema['customer/onlines'].create({
          telephone: body.data.customer.data.attributes.telephone,
          orderId: body.data.customer.data.attributes.orderId
        });
        attrs.customerId = { id: customer.id, type: 'customer/take-away'};
      }
    }
    return schema['order/eatOuts'].create(attrs);
  });
  this.patch('/order/eat-outs/:id', function(schema, request) {
    let attrs = this.normalizedRequestAttrs('order/eat-out');
    attrs.orderItemIds = [];
    let body = JSON.parse(request.requestBody);
    body.data['order-items'].forEach(item => {
      let orderItemAttrs = {
        quantity: item.data.attributes.quantity,
        menuItemId: item.data.relationships['menu-item'].data.id,
        editOptionIds: item.data.relationships['edit-options']
          ? item.data.relationships['edit-options'].data.map(editOptionRelationship => editOptionRelationship.id)
          : []
      };
      if (item.data.id) {
        schema.orderItems.find(item.data.id).update(orderItemAttrs);
        attrs.orderItemIds.push(item.data.id);
      } else {
        let orderItem = schema.orderItems.create(orderItemAttrs);
        attrs.orderItemIds.push(orderItem.id);
      }
    });
    return schema['order/eatOuts'].find(request.params.id).update(attrs);
  });
  this.get('/printer/order/:orderType/:receiptType/:orderId', { timing: 1000 });
  this.get('/customer/deliveries', (schema, request) => {
    let { telephone, addressOne, road, postcode } = request.queryParams;
    return schema['customer/deliveries'].where(customer => customer.telephone.startsWith(telephone.toUpperCase())
      && customer.addressOne.startsWith(addressOne.toUpperCase())
      && customer.road.startsWith(road.toUpperCase())
      && customer.postcode.startsWith(postcode.toUpperCase()));
  });
  this.post('/customer/deliveries', 'customer/deliveries');
  this.get('roads', (schema, request) => {
    let { name } = request.queryParams;
    let collection = new Collection('road');
    schema.db.roads.remove();
    schema['customer/deliveries'].where(customer => customer.road.startsWith(name.toUpperCase()))
      .models
      .forEach(deliveryCustomerModel => {
        let roadModel = schema.roads.new({ name: deliveryCustomerModel.road });
        roadModel.save();
        collection.add(roadModel);
      });
    return collection;
  });
  this.get('postcodes', (schema, request) => {
    let { postcode } = request.queryParams;
    let collection = new Collection('postcode');
    schema.db.postcodes.remove();
    schema['customer/deliveries'].where(customer => customer.postcode.startsWith(postcode.toUpperCase()))
      .models
      .map(deliveryCustomerModel => {
        let postcodeModel = schema.postcodes.new({ postcode: deliveryCustomerModel.postcode });
        postcodeModel.save();
        collection.add(postcodeModel);
      });
    return collection;
  });
}
