const hash = require('../../utils/hash');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');

const { SECRET_KEY, ALGORITHM } = require('./config');
const { ERR_INVALID_TOKEN } = require('../../utils/errorTypes');
const { UserModel } = require('../../resources/User/UserModel');

const generateToken = async (payload) => {
  const { password, email } = payload;

  const user = await UserModel.findOne({ email });
  
  if (!user) throw Boom.notFound('User does not exists!');
  
  if(!await (hash.compare(password, user.password)))
    throw Boom.badData('Invalid Email or Password');
  
  try {
    const token = JWT.sign(user.id, SECRET_KEY, { algorithm: ALGORITHM });
    return token;
  } catch (error) {
    throw new Error(ERR_INVALID_TOKEN);
  }
}

module.exports = {
  generateToken
}