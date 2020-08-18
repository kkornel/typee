require('dotenv').config({
  path: '.env.test',
});

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../../src/models/User');
const Token = require('../../src/models/Token');

const newUserFormValues = {
  email: 'newUser@mail.com',
  username: 'newUser',
  password: 'Strong123!',
};

const userOneId = new mongoose.Types.ObjectId();
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

const setupDatabase = async () => {
  await User.deleteMany();
  await Token.deleteMany();
  await new User(userOne).save();
  await new User(userNotVerified).save();
  await new Token(expiredToken).save();
  await new Token(validToken).save();
};

const clearDatabase = async () => {
  await User.deleteMany();
  await Token.deleteMany();
};

module.exports = {
  userOneId,
  userOne,
  userNotVerifiedId,
  userNotVerified,
  userTwoId,
  userTwo,
  newUserFormValues,
  newUserEmailTaken,
  newUserUsernameTaken,
  expiredToken,
  validToken,
  setupDatabase,
  clearDatabase,
};
