// https://mongoosejs.com/docs/populate.html#refs-to-children
// https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/

// It is debatable that we really want two sets of pointers as they may get out of sync.
// Instead we could skip populating and directly find() the [data] we are interested in.

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../config/config');
const passwordValidator = require('../utils/passwordValidator');
const ErrorResponse = require('../utils/ErrorResponse');
const { sendEmailAsync } = require('../services/email');
const verificationTemplate = require('../services/emailTemplates/verificationTemplate');
const passwordResetTemplate = require('../services/emailTemplates/passwordResetTemplate');
const Token = require('./Token');

// Delete user tasks when user is removed
// userSchema.pre('remove', async function (next) {
//   const user = this;
//   await Task.deleteMany({ author: user._id });
//   next();
// });

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
    subtext: {
      type: String,
    },
    avatar: {
      type: Buffer,
    },
    jwtTokens: [
      // It is an array, because user can log in from multiple devices,
      // so every connection from every device has different token.
      // Also logging out (deleting token) from one device,
      // will not logout user from another devices.
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
    socketId: {
      type: String,
    },
    online: {
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
// to get list of all tokens with user of that user,
// instead of querying Token collection by his id.
// It not returns tokens of user! But a user object with tokens property.
// 'tokens' property is actually not visible when console.log(user),
// but they are when using console.loge(user.tokens).
userSchema.virtual('tokens', {
  ref: 'Token',
  localField: '_id',
  foreignField: 'user',
});

userSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'author',
});

userSchema.virtual('rooms', {
  ref: 'Room',
  localField: '_id',
  foreignField: 'users.user',
});

userSchema.virtual('createdRooms', {
  ref: 'Room',
  localField: '_id',
  foreignField: 'author',
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, config.hashRounds);
  }

  next();
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorResponse(400, 'Unable to login.');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ErrorResponse(400, 'Unable to login.');
  }

  return user;
};

userSchema.methods.getRooms = async function () {
  await this.populate('rooms', '-messages').execPopulate();
  await this.populate('rooms.author').execPopulate();
  return this.rooms;
};

userSchema.methods.getRoomsNames = async function () {
  await this.populate('rooms').execPopulate();
  return this.rooms.map((room) => room.name);
};

userSchema.methods.generateAuthToken = async function () {
  // Need to call toString(), because _id is stored as ObjectID
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  this.jwtTokens.push({ token });
  await this.save();
  return token;
};

userSchema.methods.generateToken = function (expiresIn) {
  const payload = {
    user: this._id.toString(),
    token: crypto.randomBytes(20).toString('hex'),
    expires: Date.now() + expiresIn,
  };

  return new Token(payload);
};

userSchema.methods.sendVerificationEmail = function (token) {
  const url = `${process.env.REDIRECT_DOMAIN}/api/v1/auth/verify/${token}`;

  sendEmailAsync(
    this.email,
    'Confirm your email',
    verificationTemplate(this.username, url)
  );
};

userSchema.methods.sendPasswordResetEmail = function (token) {
  const url = `${process.env.REDIRECT_DOMAIN}/api/v1/auth/password/reset/${token}`;

  sendEmailAsync(
    this.email,
    'Password reset request',
    passwordResetTemplate(this.username, url)
  );
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.avatar;
  delete userObject.jwtTokens;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;

  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
