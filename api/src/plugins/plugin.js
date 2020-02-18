const HapiAuthJwt2 = require('hapi-auth-jwt2');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Swagger = require('./swagger');

module.exports = [
  HapiAuthJwt2,
  Inert,
  Vision,
  Swagger,
];
