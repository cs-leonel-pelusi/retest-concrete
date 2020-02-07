const AuthController = require('./AuthController');

module.exports = function router(server) {

  server.route({
    method: 'POST',
    path: '/login',
    handler: AuthController.login, 
  }); 

}