'use strict';

const UserRoute = require('./resources/User/UserRoute');
const AuthRoute = require('./resources/Auth/AuthRoute');

const HomeRoute = {
  method: 'GET',
    path: '/',
    options: {
      auth: false,
    },
    handler: (request, h) => ('Hello =)')
}

module.exports = [
  ...UserRoute,
  ...AuthRoute,
  HomeRoute
]