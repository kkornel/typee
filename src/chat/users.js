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

const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return { error: `Couldn't find user with id: ${userId}.` };
  }

  return { user };
};

const getRoom = async (roomName) => {
  const room = await Room.findOne({ name: roomName });

  if (!room) {
    return { error: `Room ${roomName} doesn't exist.` };
  }

  return { room };
};

const getRoomById = async (roomId) => {
  const room = await Room.findById(roomId).populate([
    { path: 'author' },
    { path: 'users.user' },
  ]);

  if (!room) {
    return { error: `Room with id ${roomId} doesn't exist.` };
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

const getUserRooms = async (userId) => {
  const rooms = await Room.find({ 'users.user': userId }).populate([
    { path: 'author' },
    { path: ' users.user' },
  ]);

  return { rooms };
};

const getUserData = async (userId) => {
  const { error, user } = await getUserById(userId);

  if (error) {
    return { error };
  }

  const rooms = await Room.find({ 'users.user': userId }).populate([
    { path: 'author' },
    { path: 'users.user' },
  ]);

  return { user, rooms };
};

const generateRoomData = async (roomId) => {
  const room = await Room.findById(roomId);
  const users = await room.getUsersInRoom();
  return { users };
};

const createMessage = async (text, roomId, authorId) => {
  const { error, room } = await getRoomById(roomId);

  if (error) {
    return { error };
  }

  const message = await new Message({
    author: authorId,
    text,
    room: roomId,
  }).save();

  room.messages.push(message);
  await room.save();

  await message
    .populate('author', '_id username avatarUrl subtext')
    .execPopulate();

  return { message, room };
};

const createSystemMessage = async (text, roomName) => {
  const { error, room } = await getRoom(roomName);

  if (error) {
    return { error };
  }

  const message = await new Message({
    text,
    systemMessage: true,
    room: room._id,
  }).save();

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
  await room.populate('messages').execPopulate();
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
  getUserById,
  getRoom,
  connectUser,
  disconnectUser,
  getUserData,
  getUserRooms,
  generateRoomData,
  createMessage,
  createSystemMessage,
  createRoom,
  joinRoom,
  leaveRoom,
  deleteRoom,
};
