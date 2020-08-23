const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  users: [
    {
      user: {
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
  avatar: {
    type: Buffer,
  },
  avatarURL: {
    type: String,
  },
});

roomSchema.methods.getUsersInRoom = async function () {
  await this.populate('users.user', '_id username online').execPopulate();
  const users = this.users.map((user) => user.user);
  return users;
};

roomSchema.methods.toJSON = function () {
  const roomObject = this.toObject();
  delete roomObject.__v;
  return roomObject;
};

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
