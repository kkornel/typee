const express = require('express');

const auth = require('./auth');
const users = require('./users');
const rooms = require('./rooms');

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/rooms', rooms);

module.exports = router;
