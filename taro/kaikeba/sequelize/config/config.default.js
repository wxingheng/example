"use strict";
const path = require("path");

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + "_sequelize-example";

  config.sequelize = {
    dialect: "mysql", // support: mysql, mariadb, postgres, mssql
    database: "egg-sequelize-example-dev",
    host: "127.0.0.1",
    port: 3306,
    password: "123456"
  };

  config.security = {
    csrf: {
      ignoreJSON: true // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    }
  };

  config.static = {
    prefix: "/public/",
    dir: [
      path.join(appInfo.baseDir, "public")
      //  path.join(appInfo.baseDir, "publicData")
    ] // 多静态文件入口
  };

  return config;
};
