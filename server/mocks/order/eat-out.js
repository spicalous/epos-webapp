module.exports = function(app) {
  var express = require('express');
  var bodyParser = require('body-parser');
  var ordersRouter = express.Router();
  ordersRouter.use(bodyParser.json());

  var eatOutArray = require('../../json/eat-out.json');

  var orderItemId = 100;

  function addOrder(order) {
    var id = orders.length;
    order.id = id;
    order.customer.id = id
    order.orderItems.forEach(function(item) {
      item.id = orderItemId++;
    });
    orders.push(order);
    return order;
  }

  var orders = eatOutArray;
  var success = true;

  ordersRouter.get('/', function(req, res) {
    res.send({ "order/eatOuts": orders });
  });

  ordersRouter.post('/', function(req, res) {
    success ?
      res.status(201).send({ "order/eatOut": addOrder(req.body['order/eatOut']) }) :
      res.status(502).send(app.genericError("502", "Printer was not found. Please check that the printer is connected and switched on"));
  });

  ordersRouter.get('/:id', function(req, res) {
    res.send({
      'order/eatOut': orders[req.params.id]
    });
  });

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

  app.use('/EPOSDataService/api/order/eatOuts', ordersRouter);
};
