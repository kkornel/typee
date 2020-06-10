const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
    required: true,
    default: Date.now,
  },
});

messageSchema.virtual('author', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
