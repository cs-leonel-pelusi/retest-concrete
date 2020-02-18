const swagger = require('hapi-swagger');

const pkg = require('../../../package');

module.exports = {
  plugin: swagger,
  options: {
    info: {
      title: 'Onboard API Documentation',
      version: pkg.version,
    },
    tags: [{
      name: 'User',
      description: 'User routes',
    },
    {
      name: 'User',
      description: 'User routes',
    }],
    documentationPath: '/docs',
  },
};
