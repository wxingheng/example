'use strict';
const qs = require("querystring");
const Service = require('egg').Service;
const jwt = require("jsonwebtoken");

const createToken = (rawData,openid)=>{
  let token = jwt.sign({
      "nickName":rawData.nickName,
      "gender":rawData.gender,
      "language":rawData.language,
      "city":rawData.city,
      "province":rawData.province,
      "country":rawData.country,
  }, openid, {
      expiresIn: 2*60*60   //token过期时间两小时
  });
  return token;
}

class User extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.User.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(token) {
    console.log("token------>>>>", token)
    const user = await this.ctx.model.User.findOne({
      token
    });
    if (!user) {
      this.ctx.throw(404, 'token not found');
    }
    return user;
  }

  async create(user) {
    return this.ctx.model.User.create(user);
  }

  async login(res){
    const data = {
      appid: "wx5e6189f24363171b",
      secret: "23f4e01eea5fa660ecbd802e55e1b91f",
      js_code: res.code,// 获取用户的 code 去请求 openID
      grant_type: "authorization_code"
    };
    const content = qs.stringify(data);
    const result = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?${content}`, {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    });
    const newdata = JSON.parse(result.data.toString());
    // 成功获取用户的 session_key   openid
    const openid = newdata.openid;
    const token = createToken(JSON.parse(res.rawData), openid);
    // 用 openid 去user 表查询是否存在该用户
    const user = await this.ctx.model.User.find({
      open_id: openid
    });
    if(!user){
      // 如果找不到，就新建用户
      this.ctx.model.User.create({
        name: 'name001',
        age: 24,
        open_id: openid,
        token
      });
    }else{
      // 用户存在就更新用户token
      user.update({
        token
      });
    }
    // 返回token 供用户进行业务操作
    return {
      status: result.status,
      headers: result.headers,
      data: {token, status: 0},
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
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.destroy();
  }
}

module.exports = User;
