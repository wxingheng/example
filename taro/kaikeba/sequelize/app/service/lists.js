'use strict';

const Service = require('egg').Service;

class User extends Service {
  async list(
    // { offset = 0, limit = 10 }
    open_id
    ) {
    // return this.ctx.model.Lists.findAndCountAll(
    // //   {
    // //   offset,
    // //   limit,
    // //   order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    // // }
    // );
    return {
      data: await this.ctx.model.Lists.findAndCountAll({
        where: {
          open_id
       },
      }),
      status: 200,
      open_id
    }
  }

  async find(id) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async create(user) {
    const data = this.ctx.model.Lists.create(user)
    return {
      data,
      status: 200
    }
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

  async del(id) {
    const user = await this.ctx.model.Lists.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return {
      msg: user.destroy(),
      status: 200
    };
  }

  async bulkCreate(lists){
    const data = await this.ctx.model.Lists.bulkCreate(lists, {updateOnDuplicate:["title", "updated_at", "done"]})
    return {
      data,
      status: 200
    }
  }
}

module.exports = User;
