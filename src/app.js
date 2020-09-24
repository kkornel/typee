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
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', api);

connectionEvent(io);

app.use(notFound);
app.use(errorHandler);
// const test = async () => {
//   const User = require('./models/User');
//   const Token = require('./models/Token');
//   const Room = require('./models/Room');
//   const Message = require('./models/Message');

//   const user = await User.findById('5eca1ddb48c3141334633931');
//   const token = await Token.findById('5eca1ddb48c3141334633932');
//   const message = await Message.findById('5edf96f0bca4a01b1c804767');
// };

// test();

// (async () => {
//   const User = require('./models/User');
//   const user = await User.findById('5f365cff264ad02a0415cd3f');
//   // user.getRoomsNames();
//   const Room = require('./models/Room');
//   const room = await Room.findOne({ name: 'a' });
//   const lel = await room.getUsersInRoom();
//   // console.log(lel);
// })();

module.exports = server;
