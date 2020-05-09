const Router = require('express').Router;
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Token = require('../models/Token');
const config = require('../config/config');

const router = new Router();

// TODO: Unify route handling
// TODO: Resend token if expired.
// TODO: Delete tokens

router.post('/api/auth/register', async (req, res) => {
  console.log('register', req.body);
  const { email, username, password } = req.body;

  const emailTaken = await User.findOne({ email });

  if (emailTaken) {
    // Google uses 409 for ALREADY_EXISTS:
    // The resource that a client tried to create already exists.
    return res.status(409).send({
      error: {
        code: 409,
        status: 'ALREADY_EXISTS',
        message: 'Email already in use.',
        details: {
          field: 'email',
          value: email,
        },
      },
    });
  }

  const usernameTaken = await User.findOne({ username });

  if (usernameTaken) {
    return res.status(409).send({
      error: {
        code: 409,
        status: 'ALREADY_EXISTS',
        message: 'Username already in use.',
        details: {
          field: 'username',
          value: username,
        },
      },
    });
  }

  const user = new User({ email, username, password });

  try {
    await user.save();

    const token = user.generateToken(config.verificationTokenExpireTime);
    await token.save();

    user.sendVerificationEmail(token.token);

    res
      .status(201)
      .send({ message: `A verification email has been sent to ${user.email}` });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: {
        code: 500,
        status: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
});

router.get('/api/auth/verify/:token', async (req, res) => {
  console.log('verify', req.body);
  if (!req.params.token) {
    // 400 INVALID_ARGUMENT
    // Client specified an invalid argument. Check error message and error details for more information.
    return res.status(400).send({
      error: {
        code: 400,
        status: 'INVALID_ARGUMENT',
        message: 'No token provided.',
      },
    });
  }

  try {
    const token = await Token.findOne({ token: req.params.token });

    if (!token) {
      return res.status(400).send({
        error: {
          code: 400,
          status: 'INVALID_ARGUMENT',
          message: 'Invalid token.',
        },
      });
    }

    // const elapsedSeconds = (Date.now() - token.createdAt.getTime()) / 1000;
    // const expired = elapsedSeconds > token.expiresIn;

    const expired = Date.now() > token.expires;

    if (expired) {
      res.status(400).send({
        error: {
          code: 400,
          status: 'BAD_REQUEST',
          message: 'Token expired.',
        },
      });
    }

    await User.findByIdAndUpdate(token.userId, { active: true });
    await token.delete();
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: {
        code: 500,
        status: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

  res.status(200).send({
    message: 'The account has been verified.',
  });
});

router.post('/api/auth/login', async (req, res) => {
  console.log('login', req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);

    if (!user.active) {
      return res.status(401).send({
        error: {
          code: 401,
          status: 'NOT_VERIFIED',
          message: 'Account has not been verified.',
          details: {
            field: 'email',
            value: email,
          },
        },
      });
    }

    const token = await user.generateAuthToken();

    res.status(200).send({ token, user });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      error: {
        code: 400,
        status: 'BAD_REQUEST',
        message: error.message,
        details: {
          field: 'email',
          value: email,
        },
      },
    });
  }
});

router.post('/api/auth/password/reset', async (req, res) => {
  console.log('reset', req.body);
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        error: {
          code: 400,
          status: 'BAD_REQUEST',
          message: `The email address ${email} is not associated with any account.`,
        },
      });
    }

    const token = user.generateToken(config.verificationTokenExpireTime);
    await token.save();

    user.sendPasswordResetEmail(token.token);

    res.status(200).send({
      message: `A reset email has been sent to ${user.email}`,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: {
        code: 500,
        status: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
});

router.post('/api/auth/verify', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        error: {
          code: 400,
          status: 'BAD_REQUEST',
          message: `The email address ${email} is not associated with any account.`,
        },
      });
    }

    const token = user.generateToken(config.verificationTokenExpireTime);
    await token.save();

    user.sendVerificationEmail(token.token);

    res
      .status(201)
      .send({ message: `A verification email has been sent to ${user.email}` });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: {
        code: 500,
        status: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
});

router.get('/api/auth/password/reset/:token', async (req, res) => {
  try {
    // Note: If here would be the validation after navigating from email link
    // the user would get raw JSON in the browser with the error.
    // This way it falls down to the redirect('/password/reset/new');
    // In that path '/password/reset/new' client side awaits for the response,
    // so the error can be properly displayed.

    // After a thought, it is better to display error, before displaying
    // the page with submission form, even if it is raw JSON.

    const token = await Token.findOne({ token: req.params.token });

    // if (!token) {
    //   return res.status(400).send({
    //     error: {
    //       code: 400,
    //       status: 'INVALID_ARGUMENT',
    //       message: 'Invalid token.',
    //     },
    //   });
    // }

    // const expired = Date.now() > token.expires;

    // if (expired) {
    //   return res.status(400).send({
    //     error: {
    //       code: 400,
    //       status: 'BAD_REQUEST',
    //       message: 'Token expired.',
    //     },
    //   });
    // }

    res.cookie('token', token.token, { httpOnly: true });
    res.redirect('/password/reset/new');
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: {
        code: 500,
        status: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
});

router.post('/api/auth/password/reset/new', async (req, res) => {
  console.log('cookies', req.cookies);
  try {
    const token = await Token.findOne({ token: req.cookies.token });

    if (!token) {
      return res.status(400).send({
        error: {
          code: 400,
          status: 'INVALID_ARGUMENT',
          message: 'Invalid token.',
        },
      });
    }

    const expired = Date.now() > token.expires;

    if (expired) {
      return res.status(400).send({
        error: {
          code: 400,
          status: 'BAD_REQUEST',
          message: 'Token expired.',
        },
      });
    }

    const { newPassword } = req.body;

    res.clearCookie('token', {
      httpOnly: true,
    });
    req.cookies = null;
    res.cookies = null;

    await token.populate('userId').execPopulate();

    // Can't do here User.findByIdAndUpdate(), because this omits
    // the middleware used in userSchema like: userSchema.pre().
    // So the new password would not be hashed.
    // Have to find, updated and change in three steps.
    const user = token.userId;
    console.log('old user', user);
    user.password = newPassword;

    await user.save();
    console.log('new user', user);

    res.status(200).send({ message: 'Password has been updated.' });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: {
        code: 500,
        status: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
});

module.exports = router;
