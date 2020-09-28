const express = require('express');
const { checkSchema } = require('express-validator');

const upload = require('../middleware/upload');
const getUser = require('../middleware/getUser');
const authenticate = require('../middleware/authenticate');
const {
  users,
  updateProfile,
  verifyPassword,
  deleteAccount,
} = require('../controllers/profile');
const { updateProfileSchema } = require('../validators/profile');

const router = express.Router();

router.get('/', getUser, users);
router.post(
  '/:id',
  // getUser,
  authenticate,
  checkSchema(updateProfileSchema),
  upload.single('file'),
  updateProfile
);
router.post('/:id/verify', authenticate, verifyPassword);
router.post('/:id/delete', authenticate, deleteAccount);

module.exports = router;
