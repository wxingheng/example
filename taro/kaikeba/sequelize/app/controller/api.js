'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async login() {
    const ctx = this.ctx;
    const user = await ctx.service.api.login(ctx.request.body);
    ctx.status = 201;
    ctx.body =  user;
  }

}

module.exports = UserController;
