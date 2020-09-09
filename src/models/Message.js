const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
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
  systemMessage: {
    type: Boolean,
    default: false,
  },
});

messageSchema.methods.toJSON = function () {
  const messageObject = this.toObject();

  delete messageObject.__v;

  return messageObject;
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
