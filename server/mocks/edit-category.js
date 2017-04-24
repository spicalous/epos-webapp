/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var editCategoryRouter = express.Router();
  var model = generateModel();

  function generateModel() {
    var result = [];
    result.push(create(1, 'Add'));
    result.push(create(2, 'Edit'));
    result.push(create(3, 'Remove'));
    result.push(create(4, 'Add Drink'));
    result.push(create(5, 'Edit Drink'));
    result.push(create(6, 'Ice Cream Flavour'));
    return result;
  }

  function create(id, name) {
    return {
      "id": id,
      "name": name
    };
  }

  editCategoryRouter.get('/', function(req, res) {
    res.send({
      'edit-category': model
    });
  });

  editCategoryRouter.get('/:id', function(req, res) {
    var id = req.params.id - 1;

    res.send({
      'edit-category': model[id]
    });
  });

  app.use('/EPOSDataService/api/editCategories', editCategoryRouter);
};
