module.exports = function(app) {
  var express = require('express');
  var bodyParser = require('body-parser');
  var deliveryCustomerRouter = express.Router();

  deliveryCustomerRouter.use(bodyParser.json());

  var customers = generateCustomers(100);

  function generateCustomers(numberOfCustomers) {
    var result = [];

    for (var i = 0; i < numberOfCustomers; i++) {
      var customer = {
        id: i,
        address: i + " road name road",
        postcode: "AB" + i + " 1CD",
        contactNumber: "0" + (2090000000 - i)
      }
      result.push(customer);
    }

    return result;
  }

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }

  var success = true;

  deliveryCustomerRouter.get('/', function(req, res) {
    var body;

    if (success) {
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
    } else {
      res.status(400).send({
        errors: [{
          error: "Bad Gateway",
          exception: "com.lovetalaythai.eposdataservice.customer.exception",
          message: "There was an error searching for the customer",
          status: 400,
          timestamp: 1445811517596
        }]
      });
    }

  });

  deliveryCustomerRouter.post('/', function(req, res) {
    success ?
      res.status(201).send({'delivery-customer': { id: req .params.id } }) :
      res.status(400).send({
        errors: [{
          error: "Bad Gateway",
          exception: "com.lovetalaythai.eposdataservice.customer.exception",
          message: "There was a problem saving the customer to the database",
          status: 400,
          timestamp: 1445811517596
        }]
      });
  });

  deliveryCustomerRouter.get('/:id', function(req, res) {
    res.send({
      'delivery-customer': customers[req.params.id]
    });
  });

  deliveryCustomerRouter.put('/:id', function(req, res) {
    success ?
      res.send({ 'delivery-customer': { id: req .params.id } }) :
      res.status(400).send({
        errors: [{
          error: "Bad Gateway",
          exception: "com.lovetalaythai.eposdataservice.customer.exception",
          message: "There was a problem updating the customer",
          status: 400,
          timestamp: 1445811517596
        }]
      });
  });

  deliveryCustomerRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/EPOSDataService/api/deliveryCustomers', deliveryCustomerRouter);
};
