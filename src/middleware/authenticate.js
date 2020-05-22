const jwt = require('jsonwebtoken');

const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

const authenticate = async (req, res, next) => {
  if (!req.header('Authorization') && req.user) {
    // Already authenticated by GoogleStrategy.
    // For sure the user doesn't use JWT.
    console.log('Authenticating via cookie and Google profile');
    return next();
  }

  // The user wasn't on the request, so probably he is using JWT.
  console.log('Authenticating via JWT');

  try {
    if (!req.header('Authorization')) {
      throw new ErrorResponse(401, 'Please authenticate.');
    }

    const token = req.header('Authorization').replace('Bearer ', '');
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id, 'jwtTokens.token': token });

    if (!user) {
      throw new ErrorResponse(401, 'Please authenticate.');
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
