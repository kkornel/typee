const Router = require('express').Router;

const User = require('../models/User');

const router = new Router();

router.post('/auth/signup', async (req, res) => {
  console.log(req.body);

  const user = new User(req.body);

  console.log(user);

  res.send('');
});

module.exports = router;
