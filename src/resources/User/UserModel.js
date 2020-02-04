import Mongoose from 'mongoose';

module.exports = Mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  phone: {
      number: number,
      ddd: number
  }  
});