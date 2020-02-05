'use strict';

const Mongoose = require('mongoose');
const Joi = require('joi');

const UserModel = Mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  phone: {
    number: Number,
    ddd: Number
  }  
});

const schemaJoiUpdate = {
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  phone: {
    number: Joi.number().optional(),
    ddd: Joi.number().optional()
  }
}

const schemaJoiSave = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone: {
    number: Joi.number().required(),
    ddd: Joi.number().required()
  }
}

module.exports = {
  UserModel,
  schemaJoiUpdate,
  schemaJoiSave
};