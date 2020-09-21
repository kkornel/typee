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
const updateRoom = [
  body('newName')
    .isLength({ max: 25 })
    .withMessage('Max length is 25')
    .trim()
    .escape(),
];

/**
 * Usage:
 * router.post('/register', checkSchema(authValidator.registerSchema), authController.register);
 */
const updateRoomSchema = {
  newName: {
    isLength: {
      errorMessage: 'Max length is 25',
      options: { max: 25 },
    },
  },
};

module.exports = {
  errorFormatter,
  updateRoom,
  updateRoomSchema,
};
