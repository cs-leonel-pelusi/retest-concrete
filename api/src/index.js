'use strict';

const HapiAuthJwt2 = require('hapi-auth-jwt2');
const HapiSwaggered = require('hapi-swaggered');
const HapiSwaggeredUi = require('hapi-swaggered-ui');
const Inert = require('inert');
const Vision = require('vision');
const Pack = require('../../package');

const Routes = require('./routes');
const server = require('./server');
const jwtStrategie = require('./resources/Auth/strategies/JWT');


require('./services/mongoService');

const init = async () => {
  
  await server.start();
  console.log("Server started!");

  const swaggerOptions = {
    info: {
      title: 'Onboard API Documentation',
      version: Pack.version,
    },
  };

  server.register([
    HapiAuthJwt2,
    Inert,
    Vision,
    {
      plugin: HapiSwaggered,
      options: swaggerOptions,
    },
    {
      plugin: HapiSwaggeredUi,
      options: {
        auth: false,
        title: 'Swagger',
        path: '/docs',
        swaggerOptions: {
          validatorUrl: null,
        }     
      }
    }
  ]);

  server.auth.strategy(jwtStrategie.name, jwtStrategie.schema, jwtStrategie.options);
  server.auth.default(jwtStrategie.name);  

  server.route(Routes);
}

process.on('unhandledRejection', (err) => {    
  console.log(err);
  process.exit(1);
});

init();
