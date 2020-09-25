const express = require('express');
const passport = require('passport');
const { checkSchema } = require('express-validator');

const { registerSchema } = require('../validators/auth');
const authenticate = require('../middleware/authenticate');
const {
  register,
  login,
  logout,
  logoutAll,
  handleResendVerificationRequest,
  verifyConfirmationToken,
  handleResetPasswordRequest,
  verifyPasswordResetToken,
  setNewPassword,
  googleCallback,
} = require('../controllers/auth');

const router = express.Router();

router.post('/register', checkSchema(registerSchema), register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/logout/all', authenticate, logoutAll);
router.post('/verify', handleResendVerificationRequest);
router.get('/verify/:token', verifyConfirmationToken);
router.post('/password/reset', handleResetPasswordRequest);
router.get('/password/reset/:token', verifyPasswordResetToken);
router.post('/password/reset/new', setNewPassword);
router.get('/google/callback', passport.authenticate('google'), googleCallback);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

module.exports = router;
