const Hapi = require('hapi');

const server = Hapi.server({
  port: '3333',
  host: 'localhost'
});

module.exports = server;