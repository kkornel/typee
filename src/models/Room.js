const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
      ref: 'Message',
    },
  ],
});

roomSchema.methods.getUsersInRoom = async function () {
  await this.populate('users.userId', '_id username').execPopulate();
  const users = this.users.map((user) => user.userId);
  return users;
};

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
