'use strict';

module.exports = app => {
  app.resources('users', '/users', app.controller.user);
  app.resources('posts', '/posts', app.controller.post);
  app.post('user', '/user', app.controller.user.create)
};
