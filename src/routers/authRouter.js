const Router = require('express').Router;
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Token = require('../models/Token');

const router = new Router();

router.post('/api/auth/signup', async (req, res) => {
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

    user.sendVerificationEmail();

    res.status(201).json({
      user,
      message:
        'Account has been created. An email has been sent to ' +
        user.email +
        '.',
    });
    // res.send(user);
  } catch (error) {
    res.status(500).send({ error: { code: 500, message: error.message } });
  }
});

router.get('/api/auth/verify/:token', async (req, res) => {
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

    const elapsedSeconds = (Date.now() - token.createdAt.getTime()) / 1000;
    const expired = elapsedSeconds > token.expiresIn;

    if (expired) {
      return res.status(400).send({
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
    res.status(500).send({ error: { code: 500, message: error.message } });
  }

  res.status(200).send({
    message: 'The account has been verified. Please log in.',
  });
});

router.post('/api/auth/login', async (req, res) => {
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

// export const tryLogin = async (email, password, models, SECRET, SECRET_2) => {
//   const user = await models.User.findOne({ where: { email }, raw: true });
//   if (!user) {
//     // user with provided email not found
//     throw new Error('Invalid login');
//   }

//   if (!user.confirmed) {
//     throw new Error('Please confirm your email to login');
//   }

//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) {
//     // bad password
//     throw new Error('Invalid login');
//   }

//   const [token, refreshToken] = await createTokens(user, SECRET, SECRET_2 + user.password);

//   return {
//     token,
//     refreshToken,
//   };
// };

module.exports = router;
