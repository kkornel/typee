const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  // Allows to use: await token.populate('user').execPopulate().
  // It not returns a user object!
  // But a token object with populated user in place of user.
  // Unlike the virtual solution, when populating document,
  // the result (user in this case) is visible on the token document object.
  // It makes sense, because it is actually stored in database.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
