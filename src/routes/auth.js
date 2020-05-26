const express = require('express');
const passport = require('passport');
const { checkSchema } = require('express-validator');

const authValidator = require('../validators/auth');
const authController = require('../controllers/auth');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post(
  '/register',
  checkSchema(authValidator.registerSchema),
  authController.register
);
router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/logout/all', authenticate, authController.logoutAll);
router.post('/verify', authController.handleResendVerificationRequest);
router.get('/verify/:token', authController.verifyConfirmationToken);
router.post('/password/reset', authController.handleResetPasswordRequest);
router.get('/password/reset/:token', authController.verifyPasswordResetToken);
router.post('/password/reset/new', authController.setNewPassword);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google'),
  authController.googleCallback
);

module.exports = router;
