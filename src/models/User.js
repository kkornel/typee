const mongoose = require('mongoose');
const validator = require('validator');

const passwordValidator = require('../utils/passwordValidator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    validate(value) {
      if (!passwordValidator.validate(value)) {
        console.log(
          'Password is not valid for: ',
          passwordValidator.validate(password, { list: true })
        );
        throw new Error('Password is invalid');
      }
    },
  },
  avatar: Buffer,
  // It is an array, because user can log in from multiple devices,
  // so every connection from every device has different token.
  // Also logging out (deleting token) from one device,
  // will not logout user from another devices.
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// TODO: Pre save hash
// TODO: Find by email and password (credentials)
// TODO: Generate auth token

const User = mongoose.model('User', userSchema);

module.exports = User;
