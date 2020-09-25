const { check, body } = require('express-validator');

const passwordValidator = require('../utils/passwordValidator');

/**
 * Usage:
 * router.post('/register', registerValidator, authController.register);
 */
const registerValidator = [
  body('email')
    .notEmpty()
    .withMessage('Required field')
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail(),
  body('username')
    .notEmpty()
    .withMessage('Required field')
    .isAlphanumeric()
    .withMessage('Only alphanumerics (letters and numbers)')
    .isLength({ min: 4, max: 18 })
    .withMessage('Required min length of 4 and max of 18')
    .trim()
    .escape(),
  check('password')
    .notEmpty()
    .withMessage('Required field')
    .bail()
    .custom((value) => {
      if (!passwordValidator.validate(value)) {
        throw new Error(
          'Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase and 1 Number'
        );
      }
      return true;
    }),
];

/**
 * Usage:
 * router.post('/register', checkSchema(registerSchema), authController.register);
 */
const registerSchema = {
  email: {
    notEmpty: {
      errorMessage: 'Required field',
    },
    isEmail: {
      errorMessage: 'Invalid email',
    },
    normalizeEmail: true,
  },
  username: {
    notEmpty: {
      errorMessage: 'Required field',
    },
    isAlphanumeric: {
      errorMessage: 'Only alphanumerics (letters and numbers)',
    },
    isLength: {
      errorMessage: 'Required min length of 4 and max of 18',
      options: { min: 4, max: 18 },
    },
    trim: true,
    escape: true,
  },
  password: {
    notEmpty: {
      errorMessage: 'Required field',
    },
    custom: {
      options: (value) => {
        if (!passwordValidator.validate(value)) {
          throw new Error(
            'Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase and 1 Number'
          );
        }
        return true;
      },
    },
  },
};

module.exports = {
  registerValidator,
  registerSchema,
};
