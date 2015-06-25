module.exports = function(app) {
  var express = require('express');
  var ordersRouter = express.Router();

//  ordersRouter.get('/', function(req, res) {
//    res.send({
//      'orders': []
//    });
//  });

  ordersRouter.post('/', function(req, res) {
    res.status(201).end();
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

  app.use('/EPOSDataService-1.0-SNAPSHOT/api/orders', ordersRouter);
};
