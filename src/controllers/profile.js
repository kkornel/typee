const { validationResult } = require('express-validator');

const User = require('../models/User');
const config = require('../config/config');
const ErrorResponse = require('../utils/ErrorResponse');
const errorFormatter = require('../validators/errorFormatter');
const { getResizedBuffer, getDataUri } = require('../utils/imageUtils');
const { cloudinaryUpload, cloudinaryDelete } = require('../utils/cloudinary');

const users = async (req, res) => {
  console.log('/users');

  res.send({ user: req.user });
};

const updateProfile = async (req, res, next) => {
  console.log(`/users/${req.params.id}`);
  try {
    const { id } = req.params;
    const { user, file } = req;
    const { email, username, password, newPassword } = req.body;
    const deleteAvatar = JSON.parse(req.body.deleteAvatar);

    console.log(req.body);
    console.log(file);

    const isAuthorized = id === user._id.toString();

    if (!isAuthorized) {
      return res.status(401).send({ error: 'Please authenticate' });
    }

    const errors = validationResult(req).formatWith(errorFormatter);
    console.log(errors.errors);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    const isCorrectPassword = await user.verifyPassword(password);

    if (!isCorrectPassword) {
      throw new ErrorResponse(401, 'Incorrect password', 'UNAUTHORIZED', {
        field: 'password',
      });
    }

    const emailTaken = await User.findOne({ email });

    if (emailTaken) {
      const isSameEmail = user._id.toString() === emailTaken._id.toString();

      if (!isSameEmail) {
        throw new ErrorResponse(409, 'Email already in use', 'ALREADY_EXISTS', {
          field: 'email',
          value: email,
        });
      }
    }

    const usernameTaken = await User.findOne({ username });

    if (usernameTaken) {
      const isSameUsername =
        user._id.toString() === usernameTaken._id.toString();

      if (!isSameUsername) {
        throw new ErrorResponse(
          409,
          'Username already in use',
          'ALREADY_EXISTS',
          {
            field: 'username',
            value: username,
          }
        );
      }
    }

    if (user.email !== email) {
      user.email = email;
      user.active = false;

      const token = user.generateToken(config.verificationTokenExpireTime);
      await token.save();

      user.sendVerificationEmail(token.token);
    }

    user.username = username;

    if (newPassword) {
      user.password = newPassword;
    }

    if (deleteAvatar && user.avatarUrl) {
      const response = await cloudinaryDelete('users', user._id.toString());
      console.log('cloudinary response', response);

      user.avatar = undefined;
      user.avatarUrl = undefined;
    }

    if (file) {
      const buffer = await getResizedBuffer(file.buffer);

      // Store avatar as binary in the database
      // 1. Sending binary to the client requires using following:
      // <img src="data:image/jpg;base64,BINARY_FROM_DB"/>
      // 2. To send image instead of binary as a response use:
      // res.set('Content-Type', 'image/png');
      // res.send(user.avatar);
      user.avatar = buffer;

      const dataUri = getDataUri(buffer);

      try {
        const response = await cloudinaryUpload(
          'users',
          user._id.toString(),
          dataUri
        );
        console.log('cloudinary response', response);

        user.avatarUrl = response.secure_url;
      } catch (error) {
        console.log('cloudinary error', error);
        throw new ErrorResponse(
          500,
          'Unable to upload image',
          'INTERNAL_SERVER_ERROR',
          {
            field: 'username',
            value: username,
          }
        );
      }
    }

    await user.save();

    res.send({ user, success: true });
  } catch (error) {
    next(error);
  }
};

const verifyPassword = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const { password } = req.body;

  console.log(`/${id}/verify`, user);

  const isAuthorized = id === user._id.toString();

  if (!isAuthorized) {
    return res.status(401).send({ error: 'Please authenticate' });
  }

  try {
    const isCorrectPassword = await user.verifyPassword(password);

    if (!isCorrectPassword) {
      throw new ErrorResponse(401, 'Incorrect password', 'UNAUTHORIZED', {
        field: 'password',
      });
    }

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  console.log(`/${id}/delete`);

  const isAuthorized = id === user._id.toString();

  if (!isAuthorized) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }

  try {
    await user.populate('rooms').execPopulate();
    await user.populate('createdRooms').execPopulate();

    const createdRooms = user.createdRooms.map((room) => room.name);

    await user.remove();

    // Sending names of created rooms in order to emit deleteRoom event to others
    res.send({ user, createdRooms });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  users,
  updateProfile,
  verifyPassword,
  deleteAccount,
};
