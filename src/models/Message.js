const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
  },
  file: {
    type: Buffer,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
