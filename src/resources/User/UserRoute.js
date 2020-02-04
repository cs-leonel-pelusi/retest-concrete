import Joi from 'joi';

import UserController from './UserController';

module.exports.userRoute = {
  method: 'POST',
    path: '/user',
    options: {
      validate: {
        payload: {
          name: Joi.string.required(),
          email: Joi.string.required(),
          password: Joi.string.required(),
          fones: {
            number: Joi.number.required(),
            ddd: Joi.number.required()
          }
        },
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0].takeover()) : h.response(error).takeover() ;
        }
      },
      handler: UserController
    }
}