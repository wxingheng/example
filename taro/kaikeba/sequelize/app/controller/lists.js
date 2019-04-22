'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    // const query = {
    //   limit: ctx.helper.parseInt(ctx.query.limit),
    //   offset: ctx.helper.parseInt(ctx.query.offset),
    // };
    const {request: {header: {token}}} = ctx;
    // 找出token 对应的 open_id
    if(!token){
      ctx.body = {
        status: 200,
        code: -1,
        msg: "请登录..."
      }
    }else{
      const user = await ctx.service.api.find(token);
      ctx.body = await ctx.service.lists.list(user.open_id);
    }
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const user = await ctx.service.lists.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    // const id = ctx.helper.parseInt(ctx.params.id);
    // const body = ctx.request.body;
    // ctx.body = await ctx.service.lists.update(ctx.request.body);
    const {request: {header: {token}}} = ctx;
    // 找出token 对应的 open_id
    const user = await ctx.service.api.find(token);
    const result = await ctx.service.lists.bulkCreate(ctx.request.body.map(d => ({...d, open_id: user.open_id})));
    ctx.body = {...result}
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.request.body.id);
    const result  = await ctx.service.lists.del(id);
    ctx.status = 200;
    ctx.body = result
  }
}

module.exports = UserController;
