const Room = require('../models/Room');
const User = require('../models/User');
const Message = require('../models/Message');

const createRoom = async (roomName, authorId, socketId) => {
  const alreadyExists = await Room.findOne({ name: roomName });

  if (alreadyExists) {
    return {
      error: 'Room already exists.',
    };
  }

  const room = new Room({ name: roomName, authorId });
  room.users.push({ userId: authorId, socketId });
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

  // TODO: Think about it!
  const alreadyInRoom = room.users.findIndex(
    // (user) => user.userId.equals(userId) && user.socketId === socketId
    (user) => user.userId.equals(userId)
  );

  console.log('alreadyInRoom', alreadyInRoom);

  if (alreadyInRoom == -1) {
    room.users.push({ userId, socketId });
  } else {
    room.users[alreadyInRoom].socketId = socketId;
  }

  await room.save();
  // await room.populate('users.userId', '_id username').execPopulate();
  await room.populate('messages', '_id authorId text createdAt').execPopulate();
  await room.populate('messages.authorId', '_id username').execPopulate();

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

  const index = room.users.findIndex((user) => user.userId === userId);
  // console.log('index', index);

  room.users.splice(index, 1);
  await room.save();

  // console.log('room', room);
  return { room };
};

const createMessage = async (text, roomName, authorId) => {
  const room = await Room.findOne({ name: roomName });

  if (!room) {
    return {
      error: `Room ${roomName} doesn't exist.`,
    };
  }

  const user = await User.findById(authorId);
  const newMessage = await new Message({ authorId, text }).save();

  room.messages.push(newMessage);
  await room.save();

  // const message = generateMessage(text, user.username, newMessage.createdAt);
  // return { message };

  await newMessage.populate('authorId', '_id username').execPopulate();
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
  // await room.populate('users.userId', '_id username').execPopulate();
  const users = await room.getUsersInRoom();
  // console.log('generateRoomData', users);
  return { users };
};

const getUserData = async (userId) => {
  const user = await User.findById(userId);
  // console.log(user);
  const rooms = await user.getRoomsNames();
  // console.log(rooms);
  return { rooms };
};

module.exports = {
  createRoom,
  joinRoom,
  createMessage,
  generateMessage,
  leaveRoom,
  generateRoomData,
  getUserData,
};
