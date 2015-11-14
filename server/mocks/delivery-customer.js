module.exports = function(app) {
  var express = require('express');
  var deliveryCustomerRouter = express.Router();

  var DELIVERY_CUSTOMERS = [
    {
      id: 0,
      mainAddress: '64 Streatham High Road',
      postcode: "SW16 1DA",
      contactNumber: "02086960854"
    },
    {
      id: 0,
      mainAddress: "50 Bond Road",
      postcode: "CR4 3HE",
      contactNumber: "02087654321"
    }
  ];

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }

  deliveryCustomerRouter.get('/', function(req, res) {
    var body;

    if (req.query.mainAddress || req.query.postcode || req.query.contactNumber) {
      body = DELIVERY_CUSTOMERS.filter(function(customer) {
        return (req.query.mainAddress ? customer.mainAddress.startsWith(req.query.mainAddress) : false)
          || (req.query.postcode ? customer.postcode.startsWith(req.query.postcode) : false)
          || (req.query.contactNumber ? customer.contactNumber.startsWith(req.query.contactNumber) : false)
      });
    } else {
      body = [];
    }

    res.send({
      'deliveryCustomers': body
    });
  });

  deliveryCustomerRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  deliveryCustomerRouter.get('/:id', function(req, res) {
    res.send({
      'delivery-customer': {
        id: req.params.id
      }
    });
  });

  deliveryCustomerRouter.put('/:id', function(req, res) {
    res.send({
      'delivery-customer': {
        id: req.params.id
      }
    });
  });

  deliveryCustomerRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/EPOSDataService/api/deliveryCustomers', deliveryCustomerRouter);
};
