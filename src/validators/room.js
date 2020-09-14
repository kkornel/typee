const { check, body, validationResult } = require('express-validator');

const passwordValidator = require('../utils/passwordValidator');

// Default:
// "errors": [
//   {
//     "value": "Abc",
//     "msg": "Invalid value.",
//     "param": "password",
//     "location": "body"
//   }
// ]
const errorFormatter = ({ location, msg, param, value }) => {
  console.log(location, msg, param, value);
  return {
    value,
    message: msg,
  };
};

/**
 * Usage:
 * router.post('/register', authValidator.register, authController.register);
 */
const update = [
  body('data.email')
    .notEmpty()
    .withMessage('Required field.')
    .isEmail()
    .withMessage('Invalid email.')
    .normalizeEmail(),
  body('username')
    .notEmpty()
    .withMessage('Required field.')
    // .isAlphanumeric()
    // .withMessage('Only alphanumerics (letters and numbers).')
    .isLength({ min: 4, max: 18 })
    .withMessage('Required min length of 4 and max of 18.')
    .trim()
    .escape(),
  check('password').notEmpty().withMessage('Required field.'),
  check('newPassword').custom((value) => {
    if (!value || passwordValidator.validate(value)) {
      return true;
    }
    throw new Error(
      'Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase and 1 Number.'
    );
  }),
];

/**
 * Usage:
 * router.post('/register', checkSchema(authValidator.registerSchema), authController.register);
 */
const updateSchema = {
  data: {
    email: {
      notEmpty: {
        errorMessage: 'Required field.',
      },
      isEmail: {
        errorMessage: 'Invalid email.',
      },
      normalizeEmail: true,
    },
    username: {
      notEmpty: {
        errorMessage: 'Required field.',
      },
      // isAlphanumeric: {
      //   errorMessage: 'Only alphanumerics (letters and numbers).',
      // },
      isLength: {
        errorMessage: 'Required min length of 4 and max of 18.',
        options: { min: 4, max: 18 },
      },
      trim: true,
      escape: true,
    },
    password: {
      notEmpty: {
        errorMessage: 'Required field.',
      },
    },
    newPassword: {
      custom: {
        options: (value) => {
          if (!value || passwordValidator.validate(value)) {
            return true;
          }
          throw new Error(
            'Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase and 1 Number.'
          );
        },
      },
    },
  },
};

module.exports = {
  errorFormatter,
  update,
  updateSchema,
};
