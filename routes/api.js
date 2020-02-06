const express = require('express');
const login = require('../controllers/login');
const logic = require('../controllers/fizzBuzz');
const verifyLogin = require('./middleware/verifyLogin');

const router = express.Router();

module.exports = (function (cache) {
  router.route('/login')
    .post(login.auth);
  router.route('/fizzBuzz/:count')
    .get(verifyLogin(), logic.test(cache));
  return router;
}());
