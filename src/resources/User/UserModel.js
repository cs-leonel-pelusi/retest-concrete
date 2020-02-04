const Mongoose = require('mongoose');

const schema = Mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  phone: {
      number: number,
      ddd: number
  }  
});

const schemaJoiUpdate = {

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
  schema,
  schemaJoiUpdate,
  schemaJoiSave
};