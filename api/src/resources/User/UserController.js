'use strict';

const boom = require('@hapi/boom');
const hash = require('../../utils/hash');

const { UserModel } = require('./UserModel');

const store = async (request, h) => {
  try {
    const userData = request.payload;
    const userExist = await UserModel.exists({ email: userData.email });

    userData.password = await hash.make(userData.password, 8);
 
    if (userExist) throw new Error('ERR_DUPLICATE_EMAIL');

    var user = new UserModel(userData);
    var result = await user.save();    
    return h.response(result);
  } catch (error) {
    console.log(error.message);
    switch(error.message) {
      case 'ERR_DUPLICATE_EMAIL':
        throw boom.badData('E-mail duplicado!');
      default:
        throw boom.badImplementation;
    }
  }
}

const getPeople = async (request, h) => { 
  try {
    var people = await UserModel.find().exec();
    return h.response(people);
  } catch (error) {
    return h.response(error).code(500);
  }
}

const getUserId = async (request, h) => { 
  try {
    var person = await UserModel.findById(request.params.id).exec();
    return h.response(person);
  } catch (error) {
    return h.response(error).code(500);
  }
}

const update = async (request, h) => {
  try {
    var person = await UserModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
    return h.response(person);
  } catch (error) {
    return h.response(error).code(500);
  }
}

const remove = async (request, h) => {
  try {
    var person = await UserModel.findByIdAndDelete(request.params.id).exec();
    return h.response(person);
  } catch (error) {
    return h.response(error).code(500);
  }
}

module.exports = {
  store,
  update,
  remove,
  getPeople,
  getUserId,  
}