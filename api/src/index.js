'use strict';

const UserRoute = require('./resources/User/UserRoute');
const AuthRoute = require('./resources/Auth/AuthRoute');
const server = require('./server');

require('./services/mongoService');


const init = async () => {
  
  await server.start();
  
  console.log("Server started!");

  server.route({
    method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello =)';
        }
  });

  UserRoute(server);
  AuthRoute(server);

  process.on('unhandledRejection', (err) => {

      console.log(err);
      process.exit(1);
  });
}

init();
