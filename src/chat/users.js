const Room = require('../models/Room');
const User = require('../models/User');
const Message = require('../models/Message');

const createRoom = async (roomName, authorId, socketId) => {
  const alreadyExists = await Room.findOne({ name: roomName });

  if (alreadyExists) {
    return {
      error: `Room ${roomName} already exists.`,
    };
  }

  const room = new Room({ name: roomName, author: authorId });
  room.users.push({ user: authorId, socketId });
  await room.save();

  const roomWithUsers = JSON.parse(JSON.stringify(room));
  roomWithUsers.users = await room.getUsersInRoom();

  return {
    room: roomWithUsers,
  };
};

const joinRoom = async (roomName, userId, socketId) => {
  const room = await Room.findOne({ name: roomName });

  if (!room) {
    return {
      error: `Room ${roomName} doesn't exist.`,
    };
  }

  const alreadyInRoom = room.users.findIndex((user) =>
    user.user.equals(userId)
  );

  if (alreadyInRoom === -1) {
    room.users.push({ user: userId, socketId });
  } else {
    room.users[alreadyInRoom].socketId = socketId;
  }

  await room.save();
  await room.populate('messages', '_id author text createdAt').execPopulate();
  await room.populate('messages.author', '_id username').execPopulate();

  // I'm doing this, because I want to have only user list under property 'users',
  // not any socketId or ObjectId, but there is no way to manipulate Mongo Document,
  // so it it necessary to create new one by copying.
  const roomWithUsers = JSON.parse(JSON.stringify(room));
  roomWithUsers.users = await room.getUsersInRoom();

  return {
    room: roomWithUsers,
  };
};

const leaveRoom = async (roomName, userId, socketId) => {
  const room = await Room.findOne({ name: roomName });

  if (!room) {
    return {
      error: `Room ${name} doesn't exist.`,
    };
  }

  // const index = room.users.findIndex((user) => user.user === userId);

  // room.users.splice(index, 1);
  // await room.save();

  return { room };
};

const createMessage = async (text, roomName, authorId) => {
  const room = await Room.findOne({ name: roomName });

  if (!room) {
    return {
      error: `Room ${roomName} doesn't exist.`,
    };
  }

  const newMessage = await new Message({ author: authorId, text }).save();

  room.messages.push(newMessage);
  await room.save();

  await newMessage.populate('author', '_id username').execPopulate();
  console.log('createMessage newMessage', newMessage);

  return { message: newMessage };
};

const generateMessage = (text, username = 'Admin', createdAt = Date.now()) => {
  return {
    text,
    username,
    createdAt,
  };
};

const generateRoomData = async (roomName) => {
  const room = await Room.findOne({ name: roomName });
  const users = await room.getUsersInRoom();
  return { users };
};

const getUserData = async (userId) => {
  const user = await User.findById(userId);
  const rooms = await user.getRoomsNames();
  return { rooms };
};

const connectUser = async (userId, socketId) => {
  console.log('connectUser');
  const user = await User.findByIdAndUpdate(
    userId,
    { socketId, online: true },
    {
      new: true,
    }
  );

  if (!user) {
    return { error: `Couldn't find user with id: ${userId}.` };
  }

  return { user };
};

const disconnectUser = async (socketId) => {
  const user = await User.findOneAndUpdate(
    { socketId },
    { socketId: null, online: false },
    {
      new: true,
    }
  );

  console.log('disconnectUser', user.toJSON());

  if (!user) {
    return { error: `Couldn't find user associated with socket: ${socketId}.` };
  }

  return { user };
};

module.exports = {
  createRoom,
  joinRoom,
  createMessage,
  generateMessage,
  leaveRoom,
  generateRoomData,
  getUserData,
  connectUser,
  disconnectUser,
};
