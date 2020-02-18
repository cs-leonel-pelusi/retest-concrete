'use strict';

const HapiAuthJwt2 = require('hapi-auth-jwt2');
const HapiSwaggeredUi = require('hapi-swaggered-ui');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Swagger = require('./swagger');

module.exports = [
  HapiAuthJwt2,
  // HapiSwaggeredUi,
  Inert,
  Vision,
  Swagger,
]