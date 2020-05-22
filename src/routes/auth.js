const express = require('express');
const passport = require('passport');

const User = require('../models/User');
const Token = require('../models/Token');
const config = require('../config/config');
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

module.exports = router;
