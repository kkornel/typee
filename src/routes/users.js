const express = require('express');

const getUser = require('../middleware/getUser');
const router = express.Router();

router.get('/', getUser, (req, res) => {
  console.log('/users');
  res.send({ user: req.user });
});

module.exports = router;
