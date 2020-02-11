'use strict';

const Joi = require('joi');

const UserController = require('./UserController');
const { schemaJoiStore, schemaJoiUpdate } = require('./UserModel');

module.exports = [
  {
    method: 'POST',
    path: '/user',
    options: {
      validate: {
        payload: schemaJoiStore,
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover() ;
        }
      },
    },
    handler: UserController.store
  }, 
  {
    method: 'GET',
    path: '/people',
    handler: UserController.getPeople
  },
  {
    method: 'GET',
    path: '/user/{id}',
    handler: UserController.getUserId
  },
  {
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
    handler: UserController.update
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler: UserController.remove
  },
];
