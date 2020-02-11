'use strict';

const HapiAuthJwt2 = require('hapi-auth-jwt2');

const Routes = require('./routes');
const server = require('./server');
const jwtStrategie = require('./resources/Auth/strategies/JWT');

require('./services/mongoService');

const init = async () => {
  
  await server.start();
  console.log("Server started!");

  server.register(HapiAuthJwt2);
  
  server.auth.strategy(jwtStrategie.name, jwtStrategie.schema, jwtStrategie.options);
  server.auth.default(jwtStrategie.name);  

  server.route(Routes);
}

process.on('unhandledRejection', (err) => {
    
  console.log(err);
  process.exit(1);
});

init();
