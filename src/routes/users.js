const express = require('express');

const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/', authenticate, (req, res) => {
  console.log('/users');
  res.send({ user: req.user });
});

module.exports = router;
