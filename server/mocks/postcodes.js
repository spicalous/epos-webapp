/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var postcodesRouter = express.Router();

  function searchPostcode(req) {
    return !req.query.postcode ?
      postcodes :
      postcodes.filter(function(postcode) {
        return postcode.postcode.startsWith(req.query.postcode);
      });
  }

  var postcodes = app.testHelper.postcodes;
  var success = true;

  postcodesRouter.get('/', function(req, res) {
    success ?
      res.send({ 'postcodes': searchPostcode(req).slice(0, 5) }) :
      res.status(502).send(app.genericError("502", "Error searching for postcode"));
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
