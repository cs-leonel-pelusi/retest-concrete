'use strict';

const plugins = require('./plugins/plugin');
const Routes = require('./routes');
const server = require('./server');
const jwtStrategie = require('./resources/Auth/strategies/JWT');

require('./services/mongoService');

const init = async () => {
  
  await server.register(plugins);
  await server.start();
  console.log("Server started!");

  server.auth.strategy(jwtStrategie.name, jwtStrategie.schema, jwtStrategie.options);
  server.auth.default(jwtStrategie.name);  

  server.route(Routes);
}

process.on('unhandledRejection', (err) => {    
  console.log(err);
  process.exit(1);
});

init();
