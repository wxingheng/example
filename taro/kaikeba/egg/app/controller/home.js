/* eslint-disable quotes */
/* eslint-disable comma-dangle */
"use strict";

const Controller = require("egg").Controller;
const qs = require("querystring");
const http = require("https");
const jwt = require("jsonwebtoken");

const blesses = ["妈呀！咋又胖了呢", "又帅了哦", "么么哒"];

const database = []; // 模拟数据库

const createToken = (rawData, openid) => {
  const token = jwt.sign(
    {
      nickName: rawData.nickName,
      gender: rawData.gender,
      language: rawData.language,
      city: rawData.city,
      province: rawData.province,
      country: rawData.country
    },
    openid,
    {
      expiresIn: 2 * 60 * 60 // token过期时间两小时
    }
  );
  return token;
};

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
  }
  async index1() {
    const { ctx } = this;
    ctx.body = "hi, egg1";
  }
  async login() {
    const { ctx } = this;

    const data = {
      appid: "wx5e6189f24363171b",
      secret: "23f4e01eea5fa660ecbd802e55e1b91f",
      js_code: ctx.request.body.code,
      grant_type: "authorization_code"
    };

    const content = qs.stringify(data);
    const options = {
      hostname: "api.weixin.qq.com",
      port: "",
      path: "/sns/jscode2session?" + content,
      method: "GET",
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    };

    const result = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?${content}`, {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    });
    const newdata = JSON.parse(result.data.toString());
    // const openid = newdata.openid
    ctx.body = {
      status: result.status,
      headers: result.headers,
      data: newdata,
      // openid
    };

    // const req = http.request(options, function(res) {
    //   res.on("data", function(_data) {
    //     const newdata = JSON.parse(_data.toString());
    //     const openid = newdata.openid;
    //     const token = createToken(ctx.request.body.rawData, openid);
    //     // 检测datebase  是否为空  空的话直接添加
    //     if (database.length <= 0) {
    //       database.push({ openid, token, session_key: newdata.session_key });
    //       ctx.body = {
    //         name: "test"
    //       };
    //       console.log("44444444444444");

    //       return false;
    //     }
    //     console.log("5555555");

    //     // 不为空 遍历database 检测是否存在 openid  存在的话更新token  否则插入 {openid,token,session_key}
    //     let openidFlag = false; // 是否存在openid标记
    //     database.forEach(item => {
    //       if (item.openid === openid) {
    //         item.token = token;
    //         openidFlag = true;
    //       }
    //     });
    //     if (!openidFlag) {
    //       database.push({ openid, token, session_key: newdata.session_key });
    //     }
    //     ctx.body = { status: 200, data: { token, _data, openid } };
    //     ctx.body = {
    //       name: "test"
    //     };
    //   });
    // });

    // req.on("error", function(e) {
    //   console.log("problem with request: " + e.message);
    // });

    // req.end();

    // ctx.body = {
    //   name: ctx.request.body.name
    // };
  }
}

module.exports = HomeController;
