'use strict';

const userWrapper = (deps) => {
  const {
    hash,
    boom,
    model,
    auth,
  } = deps;

  const { UserModel } = model;
  const { generateTokeToStore } = auth;
  
  const store = async (request, h) => {
    try {
      const userData = request.payload;
      const userExist = await UserModel.exists({ email: userData.email });
      if (userExist)
      throw new Error('ERR_DUPLICATE_EMAIL');
      
      userData.token = await generateTokeToStore(request.payload);
      userData.password = await hash.make(userData.password, 8);
      
      const user = await UserModel.create(userData);

      return h.response(user);
    } catch (error) {
      console.log(error.message);
      switch(error.message) {
        case 'ERR_DUPLICATE_EMAIL':
          throw boom.badData('E-mail duplicado!');
        default:
          throw boom.badImplementation;
      }
    }
  };
  
  const getPeople = async (request, h) => { 
    try {
      var people = await UserModel.find().exec();
      return h.response(people);
    } catch (error) {
      return h.response(error).code(500);
    }
  };
  
  const getUserId = async (request, h) => { 
    try {
      var person = await UserModel.findById(request.params.id).exec();
      return h.response(person);
    } catch (error) {
      return h.response(error).code(500);
    }
  };
  
  const update = async (request, h) => {
    try {
      if (request.auth.credentials.sub !== request.params.id) 
      return h.response('Unauthorized').code(401);
      var person = await UserModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });

      return h.response(person);
    } catch (error) {
      return h.response(error).code(500);
    }
  };
  
  const remove = async (request, h) => {
    try {
      if (request.auth.credentials.sub !== request.params.id) 
        return h.response('Unauthorized').code(401);
      var person = await UserModel.findByIdAndDelete(request.params.id).exec();
      return h.response(person);
    } catch (error) {
      return h.response(error).code(500);
    }
  };

  return {
    store,
    getPeople,
    getUserId,
    update,
    remove,
  }
};

module.exports = userWrapper
