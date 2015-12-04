module.exports = function(app) {
  var express = require('express');
  var bodyParser = require('body-parser');
  var deliveryCustomerRouter = express.Router();

  deliveryCustomerRouter.use(bodyParser.json());

  var customers = [
    {
      id: 0,
      address: '64 Streatham High Road',
      postcode: "SW16 1DA",
      contactNumber: "02086960854"
    },
    {
      id: 1,
      address: "50 Bond Road",
      postcode: "CR4 3HE",
      contactNumber: "02087654321"
    },
    {
      id: 2,
      address: "50 ABC Road",
      postcode: "CR4 2HE",
      contactNumber: "02081111110"
    }
  ];

  function addCustomer(customer) {
    var id = customers.length;
    customer.id = id;
    customers.push(customer);
    return id;
  }

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }

  deliveryCustomerRouter.get('/', function(req, res) {
    var body;

    if (req.query.address || req.query.postcode || req.query.contactNumber) {
      body = customers.filter(function(customer) {
        var result = false,
            failed = false,
            prev = false;

        if (req.query.address) {
          result = customer.address.startsWith(req.query.address);
          failed = !result
        }
        if (!failed && req.query.postcode) {
          result = result ?
              result && customer.postcode.startsWith(req.query.postcode)
              : result = customer.postcode.startsWith(req.query.postcode);
          failed = !result;
        }
        if (!failed && req.query.contactNumber) {
          result = result ?
              result = result && customer.contactNumber.startsWith(req.query.contactNumber)
              : result = customer.contactNumber.startsWith(req.query.contactNumber);
          failed = !result;
        }

        return !failed && result;
      });
    } else {
      body = [];
    }

    res.send({
      'deliveryCustomers': body
    });
  });

  var success = true;

  deliveryCustomerRouter.post('/', function(req, res) {
    success ?
      res.status(201).send({'delivery-customer': { id: addCustomer(req.body.deliveryCustomer) }}) :
      res.status(400).send({
        errors: [{
          error: "Bad Gateway",
          exception: "com.lovetalaythai.eposdataservice.customer.exception",
          message: "There was a problem saving the customer to the database",
          httpStatus: 400,
          timestamp: 1445811517596
        }]
      });
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
