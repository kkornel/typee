const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../config/config');
const passwordValidator = require('../utils/passwordValidator');
const { sendEmailAsync } = require('../services/email');
const verificationTemplate = require('../services/emailTemplates/verificationTemplate');
const passwordResetTemplate = require('../services/emailTemplates/passwordResetTemplate');
const Token = require('./Token');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    email: {
      type: String,
      unique: true,
      // required: true,
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
      // required: true,
      trim: true,
    },

    password: {
      type: String,
      // required: true,
      // minlength: 8,
      trim: true,
      validate(value) {
        if (!passwordValidator.validate(value)) {
          console.log(
            'Password is not valid for: ',
            passwordValidator.validate(value, { list: true })
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
    jwtTokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],

    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Virtual is not data stored in database.
// It is relationship between two entities.
// It is for mongoose to know how things are related.
// Allows to use: await user.populate('tokens').execPopulate(),
// to get list of all tokens with userId of that user,
// instead of querying Token collection by his id.
// It not returns tokens of user! But a user object with tokens property.
// 'tokens' property is actually not visible when console.log(user),
// but they are when using console.loge(user.tokens).
userSchema.virtual('tokens', {
  ref: 'Token',
  localField: '_id',
  foreignField: 'userId',
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, config.hashRounds);
  }

  next();
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login.');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login.');
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  // Need to call toString(), because _id is stored as ObjectID
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.jwtTokens.push({ token });
  await user.save();

  return token;
};

userSchema.methods.generateToken = function (expiresIn) {
  const payload = {
    userId: this._id.toString(),
    token: crypto.randomBytes(20).toString('hex'),
    expires: Date.now() + expiresIn,
  };

  return new Token(payload);
};

userSchema.methods.sendVerificationEmail = function (token) {
  const user = this;

  // const token = user.generateToken(60 * 60);
  // await token.save();

  // const url = `${process.env.REDIRECT_DOMAIN}/api/auth/verify/${token}`;
  const url = `${process.env.REDIRECT_DOMAIN}/api/v1/auth/verify/${token}`;

  sendEmailAsync(
    user.email,
    'Confirm your email',
    verificationTemplate(user.username, url)
  );
};

userSchema.methods.sendPasswordResetEmail = function (token) {
  const user = this;
  // const url = `${process.env.REDIRECT_DOMAIN}/api/auth/password/reset/${token}`;
  const url = `${process.env.REDIRECT_DOMAIN}/api/v1/auth/password/reset/${token}`;

  sendEmailAsync(
    user.email,
    'Password reset request',
    passwordResetTemplate(user.username, url)
  );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
