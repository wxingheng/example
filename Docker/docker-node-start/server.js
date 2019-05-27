'use strict';

const express = require('./node_modules/express');

// const path = require("path");


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

// app.use(express.static(path.join(__dirname, "./public/dist")));
app.use(express.static( "/usr/src/app/public"));


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);