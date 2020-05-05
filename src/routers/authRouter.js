const Router = require('express').Router;
const _ = require('lodash');

const User = require('../models/User');

const router = new Router();

router.post('/auth/signup', async (req, res) => {
  console.log(req.body);

  const user = new User(req.body);
  console.log(user);

  try {
    await user.save();

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
      message: 'duplicate key error',
    });
  }
});

module.exports = router;
