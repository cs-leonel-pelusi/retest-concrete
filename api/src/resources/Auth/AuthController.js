const { generateToken } = require('./TokenAuth');

const login = async (request, h) => {
  
  const token = await generateToken(request.payload);

  return h.response({ token }).code(200); 

}

module.exports = {
  login,
}