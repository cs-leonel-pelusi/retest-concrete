const package = require('../../../package');

module.exports = {
  plugin: require('hapi-swagger'),
  options: {
    info: {
      title: 'Onboard API Documentation',
      version: package.version,
    },  
    tags: [{
      'name': 'User',
      'description': 'User routes',
    },
    {
      'name': 'User',
      'description': 'User routes',
    }],
  },
}

