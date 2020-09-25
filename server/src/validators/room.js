const { body } = require('express-validator');

const updateRoomValidator = [
  body('newName')
    .isLength({ max: 25 })
    .withMessage('Max length is 25')
    .trim()
    .escape(),
];

const updateRoomSchema = {
  newName: {
    isLength: {
      errorMessage: 'Max length is 25',
      options: { max: 25 },
    },
  },
};

module.exports = {
  updateRoomValidator,
  updateRoomSchema,
};
