module.exports = function(app) {
  var express = require('express');
  var tablesRouter = express.Router();

  var tablesArray = require('../json/tables.json');

  tablesRouter.get('/', function(req, res) {
    res.send({
      'tables': tablesArray
    });
  });

  tablesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  tablesRouter.get('/:id', function(req, res) {
    res.send({
      'tables': {
        id: req.params.id
      }
    });
  });

  tablesRouter.put('/:id', function(req, res) {
    res.send({
      'tables': {
        id: req.params.id
      }
    });
  });

  tablesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/EPOSDataService/api/tables', tablesRouter);
};
