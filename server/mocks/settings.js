/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var bodyParser = require('body-parser');
  var settingsRouter = express.Router();
      settingsRouter.use(bodyParser.json());


  settingsRouter.get('/', function(req, res) {
    res.send({ settings: { id: 1, name:'settingName', value: true } });
  });

  settingsRouter.put('/:id', function(req, res) {
    res.status(201).send({ settings: { id: 1, name:'settingName', value: req.body.setting.value } });
  });

  app.use('/EPOSDataService/api/settings', settingsRouter);
};
