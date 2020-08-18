const { validationResult } = require('express-validator');

const User = require('../models/User');
const Token = require('../models/Token');
const config = require('../config/config');
const ErrorResponse = require('../utils/ErrorResponse');
const { errorFormatter } = require('../validators/auth');

const register = async (req, res, next) => {
  console.log('/register', req.body);

  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  try {
    const { email, username, password } = req.body;

    // Will never reach this, because of setting up express-validator.
    // if (!email || !username || !password) {
    //   throw new ErrorResponse(400, 'Missing required field(s).');
    // }

    const emailTaken = await User.findOne({ email });

    if (emailTaken) {
      // Google uses 409 for ALREADY_EXISTS:
      // The resource that a client tried to create already exists.
      throw new ErrorResponse(409, 'Email already in use.', 'ALREADY_EXISTS', {
        field: 'email',
        value: email,
      });
    }

    const usernameTaken = await User.findOne({ username });

    if (usernameTaken) {
      throw new ErrorResponse(
        409,
        'Username already in use.',
        'ALREADY_EXISTS',
        {
          field: 'username',
          value: username,
        }
      );
    }

    const user = new User({ email, username, password });
    await user.save();

    const token = user.generateToken(config.verificationTokenExpireTime);
    await token.save();

    user.sendVerificationEmail(token.token);

    // TODO: what to return?
    // res.status(201).send({ user, token });
    res.status(201).send({
      success: true,
      message: `A verification email has been sent to ${user.email}`,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  console.log('/login', req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ErrorResponse(400, 'Missing required field(s).');
    }

    const user = await User.findByCredentials(email, password);

    if (!user.active) {
      throw new ErrorResponse(
        401,
        'Account has not been verified.',
        'NOT_VERIFIED'
      );
    }

    const token = await user.generateAuthToken();

    // TODO: If I don't want to have 'rooms' field in the DB,
    // this is the way to get rooms from virtual to new, copied object.
    // const userWithRooms = JSON.parse(JSON.stringify(user));
    // userWithRooms.rooms = await user.getRoomsNames();

    // res.status(200).send({ user: userWithRooms, token });
    res.status(200).send({ user, token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  console.log('/logout', req.body);
  if (!req.token) {
    // No token on request means that user is authenticated by Google
    console.log('Logging out from Google');

    // Takes the cookie and kills the id inside
    req.logout();
    return res.status(200).send({});
  }

  try {
    console.log('Logging out using JWT');

    req.user.jwtTokens = req.user.jwtTokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};

const logoutAll = async (req, res, next) => {
  console.log('/logout/all', req.body);
  try {
    req.user.jwtTokens = [];
    await req.user.save();

    req.logout();

    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};

const handleResendVerificationRequest = async (req, res, next) => {
  console.log('/verify', req.body);
  try {
    const { email } = req.body;

    if (!email) {
      throw new ErrorResponse(400, 'Missing required field(s).');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ErrorResponse(
        400,
        `The email address ${email} is not associated with any account.`
      );
    }

    // Delete existing token, user requested new one
    // so either he didn't receive old or the token expired
    const token = await Token.findOne({ user: user.id });
    if (token) {
      await token.remove();
    }

    // Create new one
    const newToken = user.generateToken(config.verificationTokenExpireTime);
    await newToken.save();

    // Send new one
    user.sendVerificationEmail(newToken.token);

    res
      .status(200)
      .send({ message: `A verification email has been sent to ${user.email}` });
  } catch (error) {
    next(error);
  }
};

const verifyConfirmationToken = async (req, res, next) => {
  console.log('verify/:token', req.body);
  console.log('verify/:token', req.params.token);
  try {
    const token = await Token.findOne({ token: req.params.token });

    if (!token) {
      throw new ErrorResponse(400, 'Invalid token.');
    }

    const expired = Date.now() > token.expires;

    if (expired) {
      await token.remove();
      throw new ErrorResponse(400, 'Token expired.');
    }

    await User.findByIdAndUpdate(token.user, { active: true });
    await token.remove();

    res.status(200).send({
      message: 'The account has been verified. Please log in.',
    });
  } catch (error) {
    next(error);
  }
};

const handleResetPasswordRequest = async (req, res, next) => {
  console.log('/password/reset', req.body);
  try {
    const { email } = req.body;

    if (!email) {
      throw new ErrorResponse(400, 'Missing required field(s).');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ErrorResponse(
        400,
        `This email address is not associated with any account.`,
        'BAD_REQUEST',
        {
          field: 'email',
          value: email,
        }
      );
    }

    const token = user.generateToken(config.passwordResetTokenExpireTime);
    await token.save();

    user.sendPasswordResetEmail(token.token);

    res.status(200).send({
      success: true,
      message: `A reset email has been sent to ${user.email}`,
    });
  } catch (error) {
    next(error);
  }
};

const verifyPasswordResetToken = async (req, res, next) => {
  console.log('/password/reset/:token', req.body);
  console.log('/password/reset/:token', req.params.token);
  try {
    // Note: If here would be the validation after navigating from email link
    // the user would get raw JSON in the browser with the error.
    // This way it falls down to the redirect('/password/reset/new');
    // In that path '/password/reset/new' client side awaits for the response,
    // so the error can be properly displayed.

    // After a thought, it is better to display error, before displaying
    // the page with submission form, even if it is raw JSON.
    const token = await Token.findOne({ token: req.params.token });

    if (!token) {
      throw new ErrorResponse(400, 'Invalid token.');
    }

    const expired = Date.now() > token.expires;

    if (expired) {
      await token.remove();
      throw new ErrorResponse(400, 'Token expired.');
    }

    res.cookie('token', token.token, { httpOnly: true });
    res.redirect('/password-reset-new');
  } catch (error) {
    next(error);
  }
};

const setNewPassword = async (req, res, next) => {
  console.log('/password/reset/new', req.body);
  console.log('cookies', req.cookies);
  try {
    const token = await Token.findOne({ token: req.cookies.token });

    if (!token) {
      throw new ErrorResponse(400, 'Invalid token.');
    }

    const expired = Date.now() > token.expires;

    if (expired) {
      await token.remove();
      throw new ErrorResponse(400, 'Token expired.');
    }

    const { password } = req.body;

    if (!password) {
      throw new ErrorResponse(400, 'Missing required field(s).');
    }

    res.clearCookie('token', {
      httpOnly: true,
    });
    // req.cookies = null;
    // res.cookies = null;

    await token.populate('user').execPopulate();

    // Can't do here User.findByIdAndUpdate(), because this omits
    // the middleware used in userSchema like: userSchema.pre().
    // So the new password would not be hashed.
    // Have to find, update and change in three steps.
    const user = token.user;
    user.password = password;

    await user.save();
    await token.remove();

    res
      .status(200)
      .send({ success: true, message: 'Password has been updated.' });
  } catch (error) {
    next(error);
  }
};

const googleCallback = async (req, res) => {
  console.log('/google/callback');
  res.redirect('/');
};

module.exports = {
  register,
  login,
  logout,
  logoutAll,
  handleResendVerificationRequest,
  verifyConfirmationToken,
  handleResetPasswordRequest,
  verifyPasswordResetToken,
  setNewPassword,
  googleCallback,
};
