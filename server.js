import Hapi from 'hapi';
import Mongoose from 'mongoose';
import Joi from 'joi';
// import UserRoute from './src/resources/User/UserRoute';

const init = async () => {
  
  const server = Hapi.server({
    port: '3333',
    host: 'localhost'
  });
  
  await server.start();
  
  console.log("Server started!");
  Mongoose.connect("mongodb://localhost/onboard");
  
  const UserModel = Mongoose.model("User", {
    name: String,
    email: String,
    password: String,
    phone: {
        number: Number,
        ddd: Number
    }  
  });

  server.route({
    method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello =)';
        }
  });

  server.route({
    method: 'POST',
    path: '/user',
    options: {
      validate: {
        payload: {
          name: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
          phone: {
            number: Joi.number().required(),
            ddd: Joi.number().required()
          }
        },
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover() ;
        }
      }
    },
    handler: async (request, h) => { 
      try {
        var user = new UserModel(request.payload);
        var result = await user.save();
        return h.response(user);
      } catch (error) {
        h.responde(error).code(500);
      }
    }
  });
  
  server.route({
    method: 'GET',
    path: '/people',
    handler: async (request, h) => {
      try {
        var people = await UserModel.find().exec();
        return h.response(people);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/user/{id}',
    handler: async (request, h) => {
      try {
        var person = await UserModel.findById(request.params.id).exec();
        return h.response(person);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/user/{id}',
    options: {
      validate: {
        payload: {
          name: Joi.string().optional(),
          email: Joi.string().optional(),
          password: Joi.string().optional(),
          phone: {
            number: Joi.number().optional(),
            ddd: Joi.number().optional()
          }
        },
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover() ;
        }
      }
    },
    handler: async (request, h) => {
      try {
        var person = await UserModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
        return h.response(person);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  });
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
