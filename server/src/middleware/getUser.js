const jwt = require('jsonwebtoken');

const User = require('../models/User');

/**
 * Second middleware for determining if user is logged in.
 * It differs from authenticate, because when checking for
 * Google login there is no req.user if he is not logged in,
 * but still we pass him to next() in order to send null profile.
 */
const getUser = async (req, res, next) => {
  if (!req.header('Authorization')) {
    console.log('Authenticating via cookie and Google profile');
    return next();
  }

  try {
    console.log('Authenticating via JWT');

    const token = req.header('Authorization').replace('Bearer ', '');
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id, 'jwtTokens.token': token });

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = getUser;
