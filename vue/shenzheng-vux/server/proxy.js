var express = require('express');
var request = require('request');
var app = express();
app.use('/', function(req, res) {
// var url = 'http://192.168.36.51/' + req.url;
var url = 'http://192.168.110.96/' + req.url;
    req.pipe(request(url)).pipe(res);
});
app.listen(process.env.PORT || 3008);