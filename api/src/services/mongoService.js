const Mongoose = require('mongoose');

const options = {
  useNewUrlParser: true
}

Mongoose.connect("mongodb://localhost/onboard", options);
