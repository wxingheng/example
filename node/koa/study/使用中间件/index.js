const Koa = require("koa");
const log = require("./log");

const app = new Koa();

const config = { format: text => `===== ${text} =====` };

app.use(log(config));

app.listen(3000);