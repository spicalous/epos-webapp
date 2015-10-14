module.exports = function(app) {
  var express = require('express');
  var ordersRouter = express.Router();

//  ordersRouter.get('/', function(req, res) {
//    res.send({
//      'orders': []
//    });
//  });

  var success = true;

  ordersRouter.post('/', function(req, res) {
    success ?
      res.status(201).send({}) :
      res.status(400).send('Reason for failure placeholder');

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
