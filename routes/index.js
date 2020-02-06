const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const serverApp = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static('public'));
  app.use('/api', api);
};

module.exports = (app) => serverApp(app);
