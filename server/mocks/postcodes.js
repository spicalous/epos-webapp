/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var postcodesRouter = express.Router();

  function generatePostcodes() {
    var possible = ["SW2", "SW16", "SE24", "SE27"];
    var possibleTail = ["AA", "BB", "CC", "DD", "EE"];
    var postcodes = [];
    var numberOfPostcodes = 5;

    for (var i = 0; i < possible.length; i++) {
      for (var j = 0; j < numberOfPostcodes; j++) {
        postcodes.push({
          id: postcodes.length + 1,
          postcode: possible[i] + possibleTail[j] });
      }
    }

    return postcodes;
  }

  function searchPostcode(req) {
    return !req.query.postcode ?
      postcodes :
      postcodes.filter(function(postcode) {
        return postcode.postcode.startsWith(req.query.postcode);
      });
  }

  var postcodes = generatePostcodes();
  var success = true;

  postcodesRouter.get('/', function(req, res) {
    success ?
      res.send({ 'postcodes': searchPostcode(req).slice(0, 5) }) :
      res.status(400).send(genericError(502, "Error searching for postcode"));
  });

  postcodesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  postcodesRouter.get('/:id', function(req, res) {
    res.send({
      'postcodes': postcodes[req.params.id]
    });
  });

  postcodesRouter.put('/:id', function(req, res) {
    res.send({
      'postcodes': {
        id: req.params.id
      }
    });
  });

  postcodesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/postcodes', require('body-parser'));
  app.use('/EPOSDataService/api/postcodes', postcodesRouter);
};
