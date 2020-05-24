const express = require('express');
const passport = require('passport');

const authenticate = require('../middleware/authenticate');
const AuthController = require('../controllers/auth');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', authenticate, AuthController.logout);
router.post('/logout/all', authenticate, AuthController.logoutAll);
router.post('/verify', AuthController.handleResendVerificationRequest);
router.get('/verify/:token', AuthController.verifyConfirmationToken);
router.post('/password/reset', AuthController.handleResetPasswordRequest);
router.get('/password/reset/:token', AuthController.verifyPasswordResetToken);
router.post('/password/reset/new', AuthController.setNewPassword);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  console.log('/google/callback');
  console.log(req.sessionID);
  console.log(req.session);
  console.log(req.cookies);
  console.log(req.cookies['connect.sid']);
  res.redirect('/');
});

router.get('/v2', authenticate, (req, res) => {
  console.log(req.sessionID);
  console.log(req.session);
  console.log(req.cookies);
  console.log(req.cookies['connect.sid']);
  res.send({});
});

module.exports = router;
