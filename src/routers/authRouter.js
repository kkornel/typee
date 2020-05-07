const Router = require('express').Router;
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = new Router();

router.post('/auth/signup', async (req, res) => {
  const { email, username, password } = req.body;

  const emailTaken = await User.findOne({ email });

  if (emailTaken) {
    // Google uses 409
    // 409 ALREADY_EXISTS The resource that a client tried to create already exists.
    res.status(409).send({
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
    res.status(409).send({
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

    res.send(user);
  } catch (error) {
    // Here error.keyPattern contains an object with name of
    // the document field that caused an error.
    // E.g. user sends an email that is already in db,
    // so the error.keyPattern: { email: 1 }, which means
    // that email is in use.
    // If user send an email and username that are both in use,
    // the error will be thrown after first duplicated key found.
    // So it won't contains { username: 1 }.
    // That's why taking only first element from _.keys(error.keyPattern).
    console.log(error);
    res.status(400).send({
      code: 400,
      field: _.keys(error.keyPattern)[0],
      value: req.body[_.keys(error.keyPattern)[0]],
      message: 'duplicate key error',
    });
  }
});

router.get('/auth/verify/:token', async (req, res) => {
  try {
    const hmm = jwt.verify(req.params.token, process.env.JWT_SECRET);
    console.log(hmm);
    const { _id } = hmm;
    await User.findByIdAndUpdate(_id, { active: true });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: { code: 401, message: 'Token expired.' } });
  }

  console.log(req.params);
  res.redirect(`${process.env.REDIRECT_DOMAIN}/login`);
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
