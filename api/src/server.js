const Hapi = require('@hapi/hapi');

const server = Hapi.server({
  port: '3333',
  host: 'localhost'
});

module.exports = server;