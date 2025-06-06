const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use("/api", routes)

module.exports = app;