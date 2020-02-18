'use strict';

const Mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

const UserModel = Mongoose.model("User", new Mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: {
    number: Number,
    ddd: Number
  },
  token: String,
  last_login: { type: Number, default: new Date() }
}, { timestamps: true },
));

const schemaJoiUpdate = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().pattern(emailRegex).optional(),
  password: Joi.string().optional(),
  phone: {
    number: Joi.number().optional(),
    ddd: Joi.number().optional(),
  },
  token: Joi.string().optional(),
})

const schemaJoiStore = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required(),
  phone: {
    number: Joi.number().required(),
    ddd: Joi.number().required(),
  },
})

module.exports = {
  UserModel,
  schemaJoiUpdate,
  schemaJoiStore
};