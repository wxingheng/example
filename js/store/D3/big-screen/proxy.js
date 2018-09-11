/**
 * 基于  express  request  的反向代理
 */
var express = require('express');
var request = require('request');

var app = express();

// 添加静态资源
app.use('/', express.static('./'));

// 代理   将  /service/dashboard   转发到  http://dashboard.stpass.com/service/dashboard
app.use('/service/dashboard', function(req, res) {
var url = 'http://dashboard.stpass.com/service/dashboard' + req.url;
    req.pipe(request(url)).pipe(res);
});

// 开启本地服务  3008 端口
app.listen(process.env.PORT || 3008);