const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  // Allows to use: await token.populate('userId').execPopulate().
  // It not returns a user object!
  // But a token object with populated user in place of userId.
  // Unlike the virtual solution, when populating document,
  // the result (user in this case) is visible on the token document object.
  // It makes sense, because it is actually stored in database.
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  token: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  expires: {
    type: Date,
    required: true,
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
