const express = require('express');
const path = require('path');

require('dotenv').config();
require('./db/mongoose');

const authRouter = require('./routers/authRouter');

const app = express();

// Paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');

// Set the pug as a view engine
app.set('view engine', 'pug');

// Set the directory where the template files are located
app.set('views', viewsDirectory);

app.use(express.json());
app.use(authRouter);

module.exports = app;
