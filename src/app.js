const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./db/mongoose');
require('./services/passport/googleOath');

const api = require('./routes');

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
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
