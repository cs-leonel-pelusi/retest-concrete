const AuthController = require('./AuthController');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    options: {
      tags: ['api'],
      auth: false,
    },
    handler: AuthController.login, 
  }
];