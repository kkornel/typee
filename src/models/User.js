const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const passwordValidator = require('../utils/passwordValidator');
const { sendEmailAsync, sendEmailSync } = require('../services/email');
const verificationTemplate = require('../services/emailTemplates/verificationTemplate');
const Token = require('./Token');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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

    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;
  const rounds = 8;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, rounds);
  }

  next();
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// TODO: Generate auth token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  // Need to call toString(), because _id is stored as ObjectID
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens.push(token);
  await user.save();

  return token;
};

//
userSchema.methods.generateToken = function (expiresIn) {
  const payload = {
    userId: this._id.toString(),
    token: crypto.randomBytes(20).toString('hex'),
    expiresIn: expiresIn,
  };

  return new Token(payload);
};

// TODO: Send confirmation link
userSchema.methods.sendVerificationEmail = async function () {
  const user = this;

  const token = user.generateToken(60 * 60);

  await token.save();

  console.log(token);

  // const token = jwt.sign(
  //   {
  //     _id: user._id.toString(),
  //   },
  //   process.env.JWT_SECRET,
  //   {
  //     expiresIn: '1h',
  //   }
  // );

  const url = `${process.env.REDIRECT_DOMAIN}/auth/verify/${token}`;

  // async email (quicker response to user)
  sendEmailAsync(
    user.email,
    'Confirm your email',
    verificationTemplate(user.username, url)
  );

  // sync email (longer)
  // await sendEmailSync(
  //   user.email,
  //   'Confirm your email',
  //   verificationTemplate(user.username, url)
  // );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
