const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
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

    expiresIn: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
