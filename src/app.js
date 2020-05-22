const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./db/mongoose');
require('./services/passport/googleOath');

const api = require('./api');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');

// Set the pug as a view engine
app.set('view engine', 'pug');

// Set the directory where the template files are located
app.set('views', viewsDirectory);

app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// const authRouter = require('./routers/authRouter');
// const userRouter = require('./routers/userRouter');
// app.use(authRouter);
// app.use(userRouter);

const apis = require('./routes');
app.use('/api/v2', apis);

app.get('/api/me', (req, res) => {
  console.log(req.body);
  const user = {
    id: '2dsadas',
    username: 'kornel',
  };
  const token = 'f89347b721o4b32630fgbh3ofh23of3fh';
  res.send({ user, token });
});

const User = require('./models/User');
const Token = require('./models/Token');
const config = require('./config/config');
const ErrorResponse = require('./utils/ErrorResponse');
const authenticate = require('./middleware/authenticate');

app.get('/api/me', (req, res) => {
  console.log('object');
});

//TODO: add authenticate
app.post('/api/logout/all', async (req, res, next) => {
  console.log('/logout/all', req.body);
  try {
    req.user.jwtTokens = [];
    await req.user.save();

    res.status(200).send({});
  } catch (error) {
    next(error);
  }
});

//TODO: add authenticate
app.post('/api/logout', async (req, res, next) => {
  console.log('/logout', req.body);
  if (!req.token) {
    // No token on request means that user is authenticated by Google
    console.log('Logging out from Google');

    // Takes the cookie and kills the id inside
    req.logout();
    // TODO: Probably need to send null?
    return res.status(200).send({});
  }

  console.log('Logging out using JWT');

  try {
    req.user.jwtTokens = req.user.jwtTokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.status(200).send({});
  } catch (error) {
    next(error);
  }
});

app.post('/api/password/reset/new', async (req, res, next) => {
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
    user.password = password;

    await user.save();
    await token.remove();

    res
      .status(200)
      .send({ success: true, message: 'Password has been updated.' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/password/reset/:token', async (req, res, next) => {
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
    res.redirect('/password-new');
  } catch (error) {
    next(error);
  }
});

app.post('/api/password-reset', async (req, res, next) => {
  console.log('/password-reset', req.body);
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

    setTimeout(
      () =>
        res.status(200).send({
          success: true,
          message: `A reset email has been sent to ${user.email}`,
        }),
      2000
    );
  } catch (error) {
    next(error);
  }
});

app.get('/api/verify/:token', async (req, res, next) => {
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

    await User.findByIdAndUpdate(token.userId, { active: true });
    await token.remove();

    res.status(200).send({
      message: 'The account has been verified. Please log in.',
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/verify', async (req, res, next) => {
  console.log('/verify', req.body);
  try {
    const { email } = req.body;

    if (!email) {
      throw new ErrorResponse(400, 'Missing required field(s).');
    }

    const user = await User.findOne({ email });

    // Delete existing token, user requested new one
    // so either he didn't receive old or the token expired
    const token = await Token.findOne({ userId: user.id });
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
});

app.post('/api/sign-in', async (req, res, next) => {
  console.log('/sign-in', req.body);
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

    res.send({ user, token });
    // res.send({ message: 'Hmm!' });
  } catch (error) {
    next(error);
  }
});

app.post('/api/sign-up', async (req, res, next) => {
  console.log('/sign-up', req.body);
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      throw new ErrorResponse(400, 'Missing required field(s).');
    }

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
});

// app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
