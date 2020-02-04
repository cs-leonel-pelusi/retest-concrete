import UserModel from './UserModel';

exports.userController = async (request, h) => { 
  try {
    var user = new UserModel(request.payload);
    var result = await user.save();
    return h.response(result);
  } catch (error) {
    h.responde(error).code(500);
  }
}