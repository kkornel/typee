const Room = require('../models/Room');
const User = require('../models/User');
const Message = require('../models/Message');

const getUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return { error: `Couldn't find user with id: ${userId}.` };
  }

  return { user };
};

const getRoom = async (roomName) => {
  const room = await Room.findOne({ name: roomName }).select('-avatar');

  if (!room) {
    return { error: `Room ${roomName} doesn't exist.` };
  }

  return { room };
};

const connectUser = async (userId, socketId) => {
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

  if (!user) {
    return { error: `Couldn't find user associated with socket: ${socketId}.` };
  }

  return { user };
};

const getUserData = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return { error: `Couldn't find user with id: ${userId}.` };
  }

  const rooms = await user.getRooms();
  return { rooms };
};

const generateRoomData = async (roomName) => {
  const room = await Room.findOne({ name: roomName });
  const users = await room.getUsersInRoom();
  return { users };
};

const createMessage = async (text, roomName, authorId) => {
  const { error, room } = await getRoom(roomName);

  if (error) {
    return { error };
  }

  const message = await new Message({ author: authorId, text }).save();

  room.messages.push(message);
  await room.save();

  await message.populate('author', '_id username').execPopulate();

  return { message };
};

const createSystemMessage = async (text, roomName) => {
  const { error, room } = await getRoom(roomName);

  if (error) {
    return { error };
  }

  const message = await new Message({ text, systemMessage: true }).save();

  room.messages.push(message);
  await room.save();

  return { message };
};

const createRoom = async (roomName, authorId, socketId) => {
  const alreadyExists = await Room.findOne({ name: roomName });

  if (alreadyExists) {
    return { error: `Room ${roomName} already exists.` };
  }

  const room = new Room({ name: roomName, author: authorId });
  room.users.push({ user: authorId, socketId });
  await room.save();

  const roomWithUsers = JSON.parse(JSON.stringify(room));
  roomWithUsers.users = await room.getUsersInRoom();

  return { room: roomWithUsers };
};

const joinRoom = async (roomName, userId, socketId) => {
  const { error, room } = await getRoom(roomName);

  if (error) {
    return { error };
  }

  const alreadyInRoom = room.users.findIndex((user) =>
    user.user.equals(userId)
  );

  const alreadyIsInRoom = alreadyInRoom !== -1;

  if (!alreadyIsInRoom) {
    room.users.push({ user: userId, socketId });
  } else {
    room.users[alreadyInRoom].socketId = socketId;
  }

  await room.save();
  await room
    .populate('messages', '_id author text createdAt systemMessage')
    .execPopulate();
  await room
    .populate('messages.author', '_id username subtext avatarURL')
    .execPopulate();

  // I'm doing this, because I want to have only user list under property 'users',
  // not any socketId or ObjectId, but there is no way to manipulate Mongo Document,
  // so it it necessary to create new one by copying.
  const roomWithUsers = JSON.parse(JSON.stringify(room));
  roomWithUsers.users = await room.getUsersInRoom();

  return { room: roomWithUsers, alreadyIsInRoom };
};

const leaveRoom = async (roomName, userId) => {
  const { error, room } = await getRoom(roomName);

  if (error) {
    return { error };
  }

  const index = room.users.findIndex((user) => user.user.toString() === userId);

  room.users.splice(index, 1);

  await room.save();

  return { room };
};

const deleteRoom = async (roomName) => {
  const { error, room } = await getRoom(roomName);

  if (error) {
    return { error };
  }

  await room.remove();

  return { room };
};

module.exports = {
  getUser,
  getRoom,
  connectUser,
  disconnectUser,
  getUserData,
  generateRoomData,
  createMessage,
  createSystemMessage,
  createRoom,
  joinRoom,
  leaveRoom,
  deleteRoom,
};
