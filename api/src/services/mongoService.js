const Mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

Mongoose.connect('mongodb://localhost/onboard', options);
