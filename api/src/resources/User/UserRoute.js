'use strict';

const Joi = require('joi');

const UserController = require('./UserController');
const { schemaJoiStore, schemaJoiUpdate } = require('./UserModel');

const boom = require('@hapi/boom');
const hash = require('../../utils/hash');

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
      tags: ['api'],
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
      tags: ['api'],
    },
    handler: controller.getPeople
  },
  {
    method: 'GET',
    path: '/user/{id}',
    options: {
      tags: ['api'],
    },
    handler: controller.getUserId
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    options: {
      tags: ['api'],
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
      tags: ['api'],
    },
    handler: controller.remove
  },
];