const Joi = require('joi');

const UserController = require('./UserController');
const { schemaJoiStore, schemaJoiUpdate } = require('./UserModel');

server.route({
  method: 'POST',
  path: '/user',
  options: {
    validate: {
      payload: schemaJoiStore,
      failAction: (request, h, error) => {
        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover() ;
      }
    }
  },
  handler: UserController.store
});

server.route({
  method: 'GET',
  path: '/people',
  handler: UserController.getPeople
});

server.route({
  method: 'GET',
  path: '/user/{id}',
  handler: UserController.getUserId
});

server.route({
  method: 'PUT',
  path: '/user/{id}',
  options: {
    validate: {
      payload: schemaJoiUpdate,
      failAction: (request, h, error) => {
        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover() ;
      }
    }
  },
  handler: update
});

server.route({
  method: 'DELETE',
  path: '/user/{id}',
  handler: UserController.remove
});
