const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./db/mongoose');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');

const api = require('./api');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');

// Set the pug as a view engine
app.set('view engine', 'pug');

// Set the directory where the template files are located
app.set('views', viewsDirectory);

app.use(cookieParser());
app.use(express.json());

// app.use(authRouter);
// app.use(userRouter);

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
