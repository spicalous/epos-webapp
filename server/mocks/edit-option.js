/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var editOptionsRouter = express.Router();
  var model = generateModel();

  function generateModel() {
    var result = [];
    result.push(create(1, 1, 'ADD CHICKEN', 150));
    result.push(create(2, 1, 'ADD PORK', 150));
    result.push(create(3, 1, 'ADD BEEF', 150));
    result.push(create(4, 1, 'ADD PRAWNS', 250));
    result.push(create(5, 1, 'ADD TOFU', 75));
    result.push(create(6, 1, 'ADD CASHEW', 150));
    result.push(create(7, 1, 'ADD FRESH CHILLI', 0));
    result.push(create(8, 1, 'ADD CHILLI FLAKES', 0));
    result.push(create(9, 2, 'VERY MILD', 0));
    result.push(create(10, 2, 'MILD', 0));
    result.push(create(11, 2, 'HOT', 0));
    result.push(create(12, 2, 'VERY HOT', 0));
    result.push(create(13, 2, 'BEEF ONLY', 0));
    result.push(create(14, 2, 'BROCOLLI ONLY', 0));
    result.push(create(15, 2, 'CARROT ONLY', 0));
    result.push(create(16, 2, 'CHICKEN ONLY', 0));
    result.push(create(17, 2, 'PORK ONLY', 0));
    result.push(create(18, 2, 'PRAWNS ONLY', 0));
    result.push(create(19, 2, 'TOFU ONLY', 0));
    result.push(create(20, 2, 'VEGETARIAN ONLY', 0));
    result.push(create(21, 2, 'GREEN CURRY SAUCE', 0));
    result.push(create(22, 2, 'RED CURRY SAUCE', 0));
    result.push(create(23, 2, 'LESS SAUCE', 0));
    result.push(create(24, 2, 'MORE SAUCE', 0));
    result.push(create(25, 2, 'SEPARATE SAUCE', 0));
    result.push(create(26, 2, 'EXTRA CRISPY', 0));
    result.push(create(27, 2, 'RICE NOODLES', 0));
    result.push(create(28, 2, 'VERMICELLI NOODLES', 0));
    result.push(create(29, 2, 'EGG NOODLES', 0));
    result.push(create(30, 3, 'NO AUBERGINE', 0));
    result.push(create(31, 3, 'NO BAMBOO', 0));
    result.push(create(32, 3, 'NO BEANSPROUTS', 0));
    result.push(create(33, 3, 'NO CARROTS', 0));
    result.push(create(34, 3, 'NO CASHEW NUTS', 0));
    result.push(create(35, 3, 'NO CHILLI', 0));
    result.push(create(36, 3, 'NO CORIANDER', 0));
    result.push(create(37, 3, 'NO EGG', 0));
    result.push(create(38, 3, 'NO FISH SAUCE', 0));
    result.push(create(39, 3, 'NO GARLIC', 0));
    result.push(create(40, 3, 'NO GLUTEN', 0));
    result.push(create(41, 3, 'NO MEAT', 0));
    result.push(create(42, 3, 'NO MUSHROOMS', 0));
    result.push(create(43, 3, 'NO ONIONS', 0));
    result.push(create(44, 3, 'NO OYSTER SAUCE', 0));
    result.push(create(45, 3, 'NO PANCAKE', 0));
    result.push(create(46, 3, 'NO PEANUTS', 0));
    result.push(create(47, 3, 'NO PEPPERS', 0));
    result.push(create(48, 3, 'NO PINEAPPLE', 0));
    result.push(create(49, 3, 'NO SOY SAUCE', 0));
    result.push(create(50, 3, 'NO SPRING ONIONS', 0));
    result.push(create(51, 3, 'NO SHRIMPS', 0));
    result.push(create(52, 3, 'NO TOFU', 0));
    result.push(create(53, 3, 'NO TOMATO', 0));
    result.push(create(54, 3, 'NO VEGETABLES', 0));
    result.push(create(55, 4, 'MIXER (COKE)', 85));
    result.push(create(56, 4, 'MIXER (DIET COKE)', 85));
    result.push(create(57, 4, 'MIXER (7UP)', 85));
    result.push(create(58, 4, 'MIXER (TANGO)', 85));
    result.push(create(59, 4, 'MIXER (LIME CORDIAL)', 85));
    result.push(create(60, 4, 'MIXER (SODA WATER)', 85));
    result.push(create(61, 4, 'MIXER (TONIC WATER)', 85));
    result.push(create(62, 5, 'NO ICE', 0));
    result.push(create(63, 5, 'NO LEMON', 0));
    result.push(create(64, 5, 'LESS ICE', 0));
    result.push(create(65, 5, 'ADD ICE', 0));
    result.push(create(66, 5, 'ADD LEMON', 0));
    result.push(create(67, 6, 'VANILLA', 0));
    result.push(create(68, 6, 'CHOC CHIP', 0));
    result.push(create(69, 6, 'STRAWBERRY', 0));
    result.push(create(70, 6, 'COCONUT', 0));
    return result;
  }

  function create(id, editCategory, name, price) {
    return {
      "id": id,
      "editCategory": editCategory,
      "name": name,
      "price": price
    };
  }

  editOptionsRouter.get('/', function(req, res) {
    res.send({
      'edit-option': model
    });
  });

  editOptionsRouter.get('/:id', function(req, res) {
    var id = req.params.id + 1;

    res.send({
      'edit-option': model[id]
    });
  });

  app.use('/EPOSDataService/api/editOptions', editOptionsRouter);
};
