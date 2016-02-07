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
      'orders': orders
    });
  });

  ordersRouter.post('/', function(req, res) {
    success ?
      res.status(201).send({id:addOrder(req.body)}) :
      res.status(400).send(genericError(502, "Printer was not found. Please check that the printer is connected and switched on"));
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
