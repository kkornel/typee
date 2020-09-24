const Room = require('../models/Room');
const User = require('../models/User');
const Message = require('../models/Message');

const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return { error: `Couldn't find user with id: ${userId}` };
  }

  return { user };
};

const getRoomByName = async (name) => {
  const room = await Room.findOne({ name });

  if (!room) {
    return { error: `Room ${name} doesn't exist` };
  }

  return { room };
};

const getRoomById = async (roomId) => {
  const room = await Room.findById(roomId).populate([
    { path: 'author' },
    { path: 'users.user' },
  ]);

  if (!room) {
    return { error: `Room with id ${roomId} doesn't exist` };
  }

  return { room };
};

const getUserRoomsWithSockets = async (userId) => {
  const rooms = await Room.find({ 'users.user': userId }).populate([
    { path: 'author' },
    { path: 'users.user' },
  ]);

  return { rooms };
};

const getUserRoomsWithoutUserSockets = async (userId) => {
  const roomsWithSockets = await Room.find({ 'users.user': userId }).populate([
    { path: 'author' },
    { path: 'users.user' },
  ]);

  const rooms = await Promise.all(
    roomsWithSockets.map(async (room) => await getRoomWithoutUserSockets(room))
  );

  return { rooms };
};

const getRoomWithoutUserSockets = async (room) => {
  // I'm doing this, because I want to have only user list under property 'users',
  // not any socketId or ObjectId, but there is no way to manipulate Mongo Document,
  // so it it necessary to create new one by copying.
  const roomWithUsers = JSON.parse(JSON.stringify(room));
  roomWithUsers.users = await room.getUsersInRoom();

  return roomWithUsers;
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
    return { error: `Couldn't find user with id: ${userId}` };
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
    return { error: `Couldn't find user associated with socket: ${socketId}` };
  }

  return { user };
};

const getUserData = async (userId) => {
  const { error, user } = await getUserById(userId);

  if (error) {
    return { error };
  }

  const rooms = await getUserRoomsWithoutUserSockets(userId);

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
  const { error, room } = await getRoomByName(roomName);

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
    return { error: `Room ${roomName} already exists` };
  }

  const room = new Room({ name: roomName, author: authorId });
  room.users.push({ user: authorId, socketId });
  await room.save();

  const roomWithUsers = await getRoomWithoutUserSockets(room);

  return { room: roomWithUsers };
};

const joinRoom = async (roomName, userId, socketId) => {
  const { error, room } = await getRoomByName(roomName);

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
    .populate('messages.author', '_id username subtext avatarUrl')
    .execPopulate();

  // I'm doing this, because I want to have only user list under property 'users',
  // not any socketId or ObjectId, but there is no way to manipulate Mongo Document,
  // so it it necessary to create new one by copying.
  const roomWithUsers = await getRoomWithoutUserSockets(room);

  return { room: roomWithUsers, alreadyIsInRoom };
};

const leaveRoom = async (roomName, userId) => {
  const { error, room } = await getRoomByName(roomName);

  if (error) {
    return { error };
  }

  const index = room.users.findIndex((user) => user.user.toString() === userId);
  room.users.splice(index, 1);
  await room.save();

  return { room };
};

const deleteRoom = async (roomName) => {
  const { error, room } = await getRoomByName(roomName);

  if (error) {
    return { error };
  }

  await room.remove();

  return { room };
};

const removeUser = async (roomId, userId) => {
  const { room } = await getRoomById(roomId);

  const room2 = room.users.filter((usr) => usr.user._id.toString() !== userId);
  const userSocket = room.users.find(
    (usr) => usr.user._id.toString() === userId
  );
  room.users = room2;
  await room.save();

  await room.populate('messages').execPopulate();
  await room
    .populate('messages.author', '_id username subtext avatarUrl')
    .execPopulate();

  // I'm doing this, because I want to have only user list under property 'users',
  // not any socketId or ObjectId, but there is no way to manipulate Mongo Document,
  // so it it necessary to create new one by copying.
  const roomWithUsers = await getRoomWithoutUserSockets(room);

  return { room: roomWithUsers, user: userSocket.user };
};

module.exports = {
  getUserById,
  getRoomByName,
  getRoomById,
  getUserRoomsWithSockets,
  getUserRoomsWithoutUserSockets,
  getRoomWithoutUserSockets,
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
  removeUser,
};
