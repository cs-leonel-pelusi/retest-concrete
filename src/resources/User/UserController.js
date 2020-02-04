const UserModel = require('./UserModel');

const store = async (request, h) => { 
  try {
    var user = new UserModel(request.payload);
    var result = await user.save();
    return h.response(user);
  } catch (error) {
    h.responde(error).code(500);
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