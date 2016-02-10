/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var roadsRouter = express.Router();

  /**
   * Generate roads starting with each letter with the number of roads for each
   * letter increasing by one each time
   */
  function generateRoads() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var roads = [];
    var numberOfRoads = 10;

    for (var i = 0; i < possible.length; i++) {

      var c = possible.charAt(i);

      for (var j = 0; j < numberOfRoads; j++) {
        roads.push({
          id: roads.length + 1,
          name: c + c + c + possible.charAt(j) + " ROAD" });
      }
    }

    return roads;
  }

  function searchRoad(req) {
    return !req.query.road ?
      roads :
      roads.filter(function(road) {
        return road.name.startsWith(req.query.road);
      });
  }

  var roads = generateRoads();
  var success = true;

  roadsRouter.get('/', function(req, res) {
    success ?
      res.send({ 'roads': searchRoad(req).slice(0, 5) }) :
      res.status(502).send(app.genericError("502", "Error searching for road"));
  });

  roadsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  roadsRouter.get('/:id', function(req, res) {
    res.send({
      'roads': roads[req.params.id]
    });
  });

  roadsRouter.put('/:id', function(req, res) {
    res.send({
      'roads': {
        id: req.params.id
      }
    });
  });

  roadsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/EPOSDataService/api/roads', require('body-parser'));
  app.use('/EPOSDataService/api/roads', roadsRouter);
};
