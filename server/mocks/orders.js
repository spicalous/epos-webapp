module.exports = function(app) {
  var express = require('express');
  var bodyParser = require('body-parser');
  var ordersRouter = express.Router();

  ordersRouter.use(bodyParser.json());

  var orders = [];

  ordersRouter.get('/', function(req, res) {
    res.send({
      'orders': orders
    });
  });

  var success = true;

  ordersRouter.post('/', function(req, res) {
    success ?
      res.status(201).send({id:addOrder(req.body)}) :
      res.status(400).send({
        errors: [
          {
            error: "Bad Gateway",
            exception: "com.lovetalaythai.eposdataservice.printer.USBPrinter",
            message: "Printer was not found. Please check that the printer is connected and switched on",
            httpStatus: 502,
            timestamp: 1445811517596
          }
        ]
      });
  });

  function addOrder(order) {
    var id = orders.length;
    order.id = id;
    orders.push(order);
    return id;
  }

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
