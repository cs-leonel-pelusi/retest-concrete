const Hapi = require('hapi');
const Mongoose = require('mongoose');
const UserRoute = require('./src/resources/User/UserRoute');

const init = async () => {
  
  const server = Hapi.server({
    port: '3333',
    host: 'localhost'
  });
  
  await server.start();
  
  console.log("Server started!");
  Mongoose.connect("mongodb://localhost/onboard");
  
  server.route({
    method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello =)';
        }
  });

  server.route(UserRoute);

  process.on('unhandledRejection', (err) => {

      console.log(err);
      process.exit(1);
  });
}

init();