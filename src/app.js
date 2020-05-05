const express = require('express');

require('dotenv').config();
require('./db/mongoose');

const authRouter = require('./routers/authRouter');

const app = express();

app.use(express.json());
app.use(authRouter);

module.exports = app;
