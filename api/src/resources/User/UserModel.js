'use strict';

const Mongoose = require('mongoose');
const Joi = require('joi');

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

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

const schemaJoiUpdate = {
  name: Joi.string().optional(),
  email: Joi.string().regex(emailRegex).optional(),
  password: Joi.string().optional(),
  phone: {
    number: Joi.number().optional(),
    ddd: Joi.number().optional(),
  }
}

const schemaJoiSave = {
  name: Joi.string().required(),
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().required(),
  phone: {
    number: Joi.number().required(),
    ddd: Joi.number().required(),
  },
  token: Joi.string().required(),
}

module.exports = {
  UserModel,
  schemaJoiUpdate,
  schemaJoiSave
};