require('dotenv').config({
  path: '.env.test',
});

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../../src/models/User');
const Token = require('../../src/models/Token');
const Room = require('../../src/models/Room');

const newUserFormValues = {
  email: 'newUser@mail.com',
  username: 'newUser',
  password: 'Strong123!',
};

const userOneId = new mongoose.Types.ObjectId();
const userOnePassword = 'Strong123!';
const userOne = {
  _id: userOneId,
  email: 'userone@mail.com',
  username: 'userOne',
  password: 'Strong123!',
  active: true,
  jwtTokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const newUserEmailTaken = {
  email: 'userone@mail.com',
  username: 'newUserEmailTaken',
  password: 'Strong123!',
};

const newUserUsernameTaken = {
  email: 'newUserUsernameTaken@mail.com',
  username: 'userOne',
  password: 'Strong123!',
};

const userNotVerifiedId = new mongoose.Types.ObjectId();
const userNotVerified = {
  _id: userNotVerifiedId,
  email: 'userNotVerified@mail.com',
  username: 'userNotVerified',
  password: 'Strong123!',
  active: false,
  jwtTokens: [],
};

const expiredTokenId = new mongoose.Types.ObjectId();
const expiredToken = {
  _id: expiredTokenId,
  user: userOneId.toString(),
  token: crypto.randomBytes(20).toString('hex'),
  expires: Date.now() - 3600000,
};

const validTokenId = new mongoose.Types.ObjectId();
const validToken = {
  _id: validTokenId,
  user: userNotVerifiedId.toString(),
  token: crypto.randomBytes(20).toString('hex'),
  expires: Date.now() + 3600000,
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  email: 'usertwo@mail.com',
  username: 'userTwo',
  password: 'Strong123!',
};

const userThreeId = new mongoose.Types.ObjectId();
const userThree = {
  _id: userTwoId,
  email: 'userthree@mail.com',
  username: 'userTwo',
  password: 'Strong123!',
};

const userAvatarId = new mongoose.Types.ObjectId();
const userAvatarPassword = 'Strong123!';
const userAvatar = {
  _id: userAvatarId,
  email: 'useravatar@mail.com',
  username: 'userAvatar',
  password: userAvatarPassword,
  avatarUrl: 'www.avatar.pl',
  active: true,
  jwtTokens: [
    {
      token: jwt.sign({ _id: userAvatarId }, process.env.JWT_SECRET),
    },
  ],
};

const roomOneId = new mongoose.Types.ObjectId();
const roomOneName = 'Room One';
const roomOne = {
  _id: roomOneId,
  author: userOneId,
  name: roomOneName,
  avatarUrl: 'www.avatar.pl',
  users: [
    {
      _id: new mongoose.Types.ObjectId(),
      user: userOneId,
      socketId: 'SocketOneId',
    },
  ],
};

const roomTwoId = new mongoose.Types.ObjectId();
const roomTwoName = 'Room Two';
const roomTwo = {
  _id: roomTwoId,
  author: userAvatarId,
  name: roomTwoName,
  avatarUrl: 'www.avatar.pl',
  users: [
    {
      _id: new mongoose.Types.ObjectId(),
      user: userOneId,
      socketId: 'SocketOneId',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      user: userAvatarId,
      socketId: 'SocketAvatarId',
    },
  ],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Token.deleteMany();
  await Room.deleteMany();
  await new User(userOne).save();
  await new User(userThree).save();
  await new User(userAvatar).save();
  await new User(userNotVerified).save();
  await new Token(expiredToken).save();
  await new Token(validToken).save();
  await new Room(roomOne).save();
  await new Room(roomTwo).save();
};

const clearDatabase = async () => {
  await User.deleteMany();
  await Token.deleteMany();
  await Room.deleteMany();
};

module.exports = {
  userOneId,
  userOne,
  userOnePassword,
  userNotVerifiedId,
  userNotVerified,
  userTwoId,
  userTwo,
  userThreeId,
  userThree,
  userAvatarId,
  userAvatar,
  userAvatarPassword,
  newUserFormValues,
  newUserEmailTaken,
  newUserUsernameTaken,
  expiredToken,
  validToken,
  roomOneId,
  roomOneName,
  roomOne,
  roomTwoId,
  roomTwoName,
  roomTwo,
  setupDatabase,
  clearDatabase,
};
