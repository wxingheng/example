'use strict';

module.exports = app => {
  app.resources('users', '/users', app.controller.user);
  app.resources('posts', '/posts', app.controller.post);
  app.post('user', '/user', app.controller.user.create);
  app.post('api', '/api/login', app.controller.api.login);
  app.get('list', '/api/lists', app.controller.lists.index);
  app.post('list', '/api/list', app.controller.lists.create);
  app.post('list', '/api/lists', app.controller.lists.update);
  app.post('list', '/api/list/delete', app.controller.lists.destroy);
};
