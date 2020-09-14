const express = require('express');
const { checkSchema } = require('express-validator');

const upload = require('../middleware/upload');
const getUser = require('../middleware/getUser');
const authenticate = require('../middleware/authenticate');
const {
  updateProfile,
  verifyPassword,
  deleteAccount,
} = require('../controllers/profile');
const { updateSchema } = require('../validators/profile');

const router = express.Router();

router.get('/', getUser, (req, res) => {
  console.log('/users');
  res.send({ user: req.user });
});

router.post(
  '/:id',
  getUser,
  checkSchema(updateSchema),
  upload.single('file'),
  updateProfile
);

router.post('/:id/verify', authenticate, verifyPassword);
router.post('/:id/delete', authenticate, deleteAccount);

module.exports = router;
