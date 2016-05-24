module.exports = function(app) {
  var express = require('express');
  var bodyParser = require('body-parser');
  var ordersRouter = express.Router();
  ordersRouter.use(bodyParser.json());

  function addOrder(order) {
    var id = orders.length;
    order.id = id;
    orders.push(order);
    return id;
  }

  var orders = [];
  var success = true;

  ordersRouter.get('/', function(req, res) {
    res.send({
      "orders":[
        {
          "id":0,
          "dateTime":"2016-03-09T00:07:56.495Z",
          "orderItems":[
            {
              "id":0,"menuItem":{"id":1,"menuId":"","name":"Spicy PC","description":"","price":250,"categories":[0],"editCategories":[0,1]},"quantity":1,"editOptions":[]
            },
            {
              "id":1,"menuItem":{"id":3,"menuId":"2","name":"Prawn Rolls","description":"","price":575,"categories":[0],"editCategories":[0,1]},"quantity":1,"editOptions":[]
            },
            {
              "id":2,"menuItem":{"id":47,"menuId":"34","name":"Beef Massaman","description":"","price":850,"categories":[3],"editCategories":[0,1]},"quantity":1,"editOptions":[]
            },
            {
              "id":3,"menuItem":{"id":99,"menuId":"82","name":"Steamed Rice","description":"","price":250,"categories":[12],"editCategories":[0,1]},"quantity":1,"editOptions":[]
            }
          ],
          "customer":{
            "type":"takeaway-customer",
            "id":0,
            "telephone":"",
            "name":"name"
          },
          "notes":"This is a note",
          "paymentMethod":null,
          "estimatedTime":20
        },
        {
          "id":1,
          "dateTime":"2016-03-09T00:09:10.679Z",
          "orderItems":[
            {
              "id":4,"menuItem":{"id":17,"menuId":"17","name":"Mix Starter (2pp)","description":"","price":1350,"categories":[0],"editCategories":[0,1]},"quantity":1,"editOptions":[]
            },
            {
              "id":5,"menuItem":{"id":35,"menuId":"31","name":"Chicken Red Curry","description":"","price":795,"categories":[3],"editCategories":[0,1]},"quantity":1,"editOptions":[{"id":2,"editCategory":0,"name":"ADD BEEF","price":150},{"id":9,"editCategory":1,"name":"VERY HOT","price":0}]
            },
            {
              "id":6,"menuItem":{"id":93,"menuId":"76","name":"Pad Thai","description":"","price":795,"categories":[11],"editCategories":[0,1]},"quantity":1,"editOptions":[]
            },
            {
              "id":7,"menuItem":{"id":99,"menuId":"82","name":"Steamed Rice","description":"","price":250,"categories":[12],"editCategories":[0,1]},"quantity":1,"editOptions":[]
            }
          ],
          "customer":{
            "type":"delivery-customer",
            "id":23,
            "telephone":"02036240212",
            "addressOne":"33B",
            "addressTwo":"TELFORD AVENUE",
            "postcode":"SW2 4XL"
          },
          "notes":"",
          "paymentMethod":"CARD",
          "estimatedTime":45
        }
      ]
    });
  });

  ordersRouter.post('/', function(req, res) {
    success ?
      res.status(201).send({id:addOrder(req.body)}) :
      res.status(502).send(app.genericError("502", "Printer was not found. Please check that the printer is connected and switched on"));
  });

//  ordersRouter.get('/:id', function(req, res) {
//    res.send({
//      'orders': {
//        id: req.params.id
//      }
//    });
//  });

//  ordersRouter.put('/:id', function(req, res) {
//    res.send({
//      'orders': {
//        id: req.params.id
//      }
//    });
//  });

//  ordersRouter.delete('/:id', function(req, res) {
//    res.status(204).end();
//  });

  app.use('/EPOSDataService/api/orders', ordersRouter);
};
