const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      socketId: {
        type: String,
        required: true,
      },
    },
  ],

  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Message',
    },
  ],
});

roomSchema.virtual('usersDocuments', {
  ref: 'User',
  localField: 'users.userId',
  foreignField: '_id',
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
