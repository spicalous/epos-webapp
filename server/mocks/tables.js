module.exports = function(app) {
  var express = require('express');
  var tablesRouter = express.Router();

  tablesRouter.get('/', function(req, res) {
    res.send({
      'table': [
        {
          'id': 0,
          'tableId': '1',
          'status': 'AVAILABLE'
        },
        {
          'id': 1,
          'tableId': '2',
          'status': 'OCCUPIED'
        },
        {
          'id': 2,
          'tableId': '3',
          'status': 'PAYMENT_PENDING'
        },
        {
          'id': 3,
          'tableId': '4',
          'status': 'AVAILABLE'
        },
        {
          'id': 4,
          'tableId': '5',
          'status': 'AVAILABLE'
        },
        {
          'id': 5,
          'tableId': '6',
          'status': 'AVAILABLE'
        },
        {
          'id': 6,
          'tableId': '7',
          'status': 'AVAILABLE'
        },
        {
          'id': 7,
          'tableId': '8',
          'status': 'AVAILABLE'
        },
        {
          'id': 8,
          'tableId': '9',
          'status': 'AVAILABLE'
        },
        {
          'id': 9,
          'tableId': '10',
          'status': 'AVAILABLE'
        },
        {
          'id': 10,
          'tableId': '11',
          'status': 'AVAILABLE'
        },
        {
          'id': 11,
          'tableId': '12',
          'status': 'AVAILABLE'
        },
        {
          'id': 12,
          'tableId': '13',
          'status': 'AVAILABLE'
        },
        {
          'id': 13,
          'tableId': '14',
          'status': 'AVAILABLE'
        },
        {
          'id': 14,
          'tableId': '15',
          'status': 'AVAILABLE'
        },
        {
          'id': 15,
          'tableId': '16',
          'status': 'AVAILABLE'
        },
        {
          'id': 16,
          'tableId': '17',
          'status': 'AVAILABLE'
        },
        {
          'id': 17,
          'tableId': '18',
          'status': 'AVAILABLE'
        },
        {
          'id': 18,
          'tableId': '19',
          'status': 'AVAILABLE'
        },
        {
          'id': 19,
          'tableId': '20',
          'status': 'AVAILABLE'
        }
      ]
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
