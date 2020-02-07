const hash = require('../../utils/hash');
const Boom = require('@hapi/boom');

const { UserModel } = require('../../resources/User/UserModel');

const login = async (request, h) => {
  const user = await UserModel.findOne({ email: request.payload.email });

  if (!user) throw Boom.notFound('User does not exists!');

  if(!await (hash.compare(request.payload.password, user.password)))
    throw Boom.badData('Invalid Email or Password');
  
  return 'Usuario Logado!';

}

module.exports = {
  login,
}