'use strict';

const boom = require('@hapi/boom');
const hash = require('../../utils/hash');

const UserController = require('./UserController');
const { schemaJoiStore, schemaJoiUpdate } = require('./UserModel');
const { UserModel } = require('./UserModel');
const { generateTokeToStore } = require('../Auth/TokenAuth');

const deps = {
  boom,
  hash,
  model: { UserModel },
  auth: { generateTokeToStore },
}

const controller = UserController(deps);

module.exports = [
  {
    method: 'POST',
    path: '/user',
    options: {
      tags: ['api', 'user'],
      auth: false,
      validate: {
        payload: schemaJoiStore,
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        }
      },
    },
    handler: controller.store
  },
  {
    method: 'GET',
    path: '/people',
    options: {
      tags: ['api', 'user'],
    },
    handler: controller.getPeople
  },
  {
    method: 'GET',
    path: '/user/{id}',
    options: {
      tags: ['api', 'user'],
    },
    handler: controller.getUserId
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    options: {
      tags: ['api', 'user'],
      validate: {
        payload: schemaJoiUpdate,
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        }
      },
    },
    handler: controller.update
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    options: {
      tags: ['api', 'user'],
    },
    handler: controller.remove
  },
];
