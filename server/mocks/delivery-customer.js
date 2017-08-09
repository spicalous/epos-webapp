module.exports = function(app) {
  var express = require('express');
  var bodyParser = require('body-parser');
  var deliveryCustomerRouter = express.Router();
  deliveryCustomerRouter.use(bodyParser.json());

  function searchCustomer(req) {
    var body = [];

    if (req.query.addressOne || req.query.addressTwo || req.query.postcode || req.query.telephone) {

      body = customers.filter(function(customer) {
        var match = false,
            failedMatch = false;

        if (req.query.addressOne) {
          match = customer.addressOne.startsWith(req.query.addressOne);
          failedMatch = !match;
        }
        if (!failedMatch && req.query.addressTwo) {
          match = customer.addressTwo.startsWith(req.query.addressTwo);
          failedMatch = !match;
        }
        if (!failedMatch && req.query.postcode) {
          match = customer.postcode.startsWith(req.query.postcode);
          failedMatch = !match;

        }
        if (!failedMatch && req.query.telephone) {
          match = customer.telephone.startsWith(req.query.telephone);
          failedMatch = !match;
        }

        //if even a single failedMatch we need to return false;
        return !failedMatch && match;
      });
    }

    return body;
  }

  var customers = app.testHelper.customers;
  var success = true;

  deliveryCustomerRouter.get('/', function(req, res) {
    success ?
      res.send({ 'deliveryCustomers': searchCustomer(req) }) :
      res.status(502).send(app.genericError("502", "Error searching for customer"));
  });

  deliveryCustomerRouter.post('/', function(req, res) {
    success ?
      res.status(201).send({ 'delivery-customer': { id: customers.length } }) :
      res.status(400).send(app.genericError("400", "There was a problem saving the customer to the database"));
  });

  deliveryCustomerRouter.get('/:id', function(req, res) {
    res.send({
      'delivery-customer': customers[req.params.id]
    });
  });

  deliveryCustomerRouter.put('/:id', function(req, res) {
    success ?
      res.send({ 'delivery-customer': { id: req.params.id } }) :
      res.status(400).send(app.genericError("400", "There was a problem updating the customer"));
  });

  deliveryCustomerRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/EPOSDataService/api/deliveryCustomers', deliveryCustomerRouter);
};
