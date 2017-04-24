/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var categoriesRouter = express.Router();
  var model = generateModel();

  function generateModel() {
    var result = [];
    result.push(create(1, 'Starters'));
    result.push(create(2, 'Soups'));
    result.push(create(3, 'Salads'));
    result.push(create(4, 'Curries'));
    result.push(create(5, 'Chicken'));
    result.push(create(6, 'Pork'));
    result.push(create(7, 'Beef'));
    result.push(create(8, 'Duck'));
    result.push(create(9, 'Fish'));
    result.push(create(10, 'Seafood'));
    result.push(create(11, 'Vegetarian'));
    result.push(create(12, 'Noodles'));
    result.push(create(13, 'Rice'));
    result.push(create(14, 'Chef Specials'));
    result.push(create(15, 'Desserts'));
    result.push(create(16, 'Soft Drinks'));
    result.push(create(17, 'Alcohol'));
    result.push(create(18, 'Delivery'));
    return result;
  }

  function create(id, name) {
    return {
      "id": id,
      "name": name
    }
  }

  categoriesRouter.get('/', function(req, res) {
    res.send({
      'category': model
    });
  });

  categoriesRouter.get('/:id', function(req, res) {
    var id = req.params.id + 1;

    res.send({
      'category': model[id]
    });
  });

  app.use('/EPOSDataService/api/categories', categoriesRouter);
};
