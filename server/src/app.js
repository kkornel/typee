const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const passport = require('passport');
const socketio = require('socket.io');
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./db/mongoose');
require('./services/passport/googleOath');

const api = require('./routes');
const connectionEvent = require('./chat/listeners');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.set('origins', '*:*');

// Paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');

// Set the pug as a view engine
app.set('view engine', 'pug');

// Set the directory where the template files are located
app.set('views', viewsDirectory);

api.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: { sameSite: 'strict' },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', api);

connectionEvent(io);

app.use(notFound);
app.use(errorHandler);

module.exports = server;
