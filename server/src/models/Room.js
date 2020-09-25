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
  // Was storing buffer in database, but switched to cloudinary hosting
  // and storing now URLs only
  // avatar: {
  //   type: Buffer,
  // },
  avatarUrl: {
    type: String,
  },
});

roomSchema.pre('remove', async function (next) {
  await this.populate('messages').execPopulate();

  this.messages.forEach((message) => {
    message.remove();
  });

  next();
});

roomSchema.methods.getUsersInRoom = async function () {
  await this.populate(
    'users.user',
    '_id username online avatarUrl subtext'
  ).execPopulate();

  return this.users.map((user) => user.user);
};

roomSchema.methods.toJSON = function () {
  const roomObject = this.toObject();

  delete roomObject.__v;

  return roomObject;
};

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
