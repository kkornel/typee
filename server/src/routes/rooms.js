const express = require('express');
const { checkSchema } = require('express-validator');

const upload = require('../middleware/upload');
const getUser = require('../middleware/getUser');
const authenticate = require('../middleware/authenticate');
const ErrorResponse = require('../utils/ErrorResponse');
const { update } = require('../controllers/rooms');
const { updateRoomSchema } = require('../validators/room');

const router = express.Router();

router.post(
  '/:name',
  // getUser,
  authenticate,
  checkSchema(updateRoomSchema),
  upload.single('file'),
  update
  // (error, req, res, next) => {
  //   next(new ErrorResponse(400, error.message));
  // }
);

module.exports = router;
