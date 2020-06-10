const Room = require('../models/Room');
const User = require('../models/User');
const Message = require('../models/Message');

const createRoom = async (name, creatorId, socketId) => {
  const room = await Room.findOne({ name });

  if (room) {
    return {
      error: 'Room already exists.',
    };
  }

  const user = await User.findById(creatorId);

  const newRoom = new Room({ name, ownerId: creatorId });
  newRoom.users.push({ userId: creatorId, socketId });
  await newRoom.save();

  // TODO: Is it good approach?
  user.rooms.push(newRoom.name);
  await user.save();

  return {
    room: newRoom,
  };
};

const joinRoom = async (name, userId, socketId) => {
  const room = await Room.findOne({ name });

  if (!room) {
    return {
      error: `Room ${name} doesn't exist.`,
    };
  }

  const alreadyInRoom = room.users.findIndex(
    (user) => user.userId.equals(userId) && user.socketId === socketId
  );

  console.log('alreadyInRoom', alreadyInRoom);

  if (alreadyInRoom == -1) {
    room.users.push({ userId, socketId });
    await room.save();
  }

  return {
    room,
  };
};

// const leaveRoom = async (socketId) => {
//   const rooms = await Room.find({ 'users.socketId': socketId });
//   console.log('rooms', rooms);

//   rooms.forEach(async (room) => {
//     const index = room.users.findIndex((user) => user.socketId === socketId);
//     console.log('index', index);

//     room.users.splice(index, 1);
//     await room.save();
//     console.log('room', room);
//   });
// };

const leaveRoom = async (roomName, userId, socketId) => {
  const room = await Room.findOne({ name: roomName });

  const index = room.users.findIndex((user) => user.userId === userId);
  console.log('index', index);

  room.users.splice(index, 1);
  await room.save();

  console.log('room', room);
  return { room };
};

const createMessage = async (text, roomName, userId) => {
  const room = await Room.findOne({ name: roomName });

  if (!room) {
    return {
      error: `Room ${roomName} doesn't exist.`,
    };
  }

  const user = await User.findById(userId);
  const newMessage = await new Message({ userId, text }).save();

  room.messages.push(newMessage);
  await room.save();

  const message = generateMessage(text, user.username, newMessage.createdAt);

  return { message };
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

  console.log(room);

  await room.populate('usersDocuments').execPopulate();
  console.log(room.usersDocuments);
  const users = room.usersDocuments.map((user) => user.username);
  console.log('users', users);
  return { users };
};

module.exports = {
  createRoom,
  joinRoom,
  createMessage,
  generateMessage,
  leaveRoom,
  generateRoomData,
};
