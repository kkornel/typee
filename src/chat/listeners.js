const {
  createRoom,
  joinRoom,
  generateMessage,
  generateSystemMessage,
  createMessage,
  leaveRoom,
  generateRoomData,
  getUserData,
  connectUser,
  disconnectUser,
  getRoom,
  deleteRoom,
} = require('./users');

const User = require('../models/User');

const connectionEvent = (io) => {
  io.on('connection', (socket) => {
    console.log('New connection', socket.id);

    socket.on('deleteRoom', async ({ roomName }, callback) => {
      console.log('deleteRoom', roomName);

      const { error, room } = await deleteRoom(roomName);

      if (error) {
        console.log(error);
        return callback({ error });
      }

      io.to(room.name).emit('roomDeleted', room);

      callback({ room });
    });

    socket.on('connectUser', async ({ userId }, callback) => {
      const { error, user } = await connectUser(userId, socket.id);

      console.log('connectUser', user.toJSON(), error);

      callback({ error, user });

      const rooms = await user.getRoomsNames();
      rooms.forEach((room) => {
        io.to(room).emit('userStatusChanged', user);
      });
    });

    socket.on('disconnect', async () => {
      const { error, user } = await disconnectUser(socket.id);

      if (error) {
        return;
      }

      console.log('disconnectUser', user.toJSON());

      const rooms = await user.getRoomsNames();
      rooms.forEach((room) => {
        io.to(room).emit('userStatusChanged', user);
      });

      // leaveRoom(socket.id);
      // const user = removeUser(socket.id);

      // if (user) {
      //   io.to(user.room).emit(
      //     'message',
      //     generateMessage(`${userId} has left!`)
      //   );
      //   io.to(user.room).emit('roomData', {
      //     room: user.room,
      //     users: getUsersInRoom(user.room),
      //   });
      // }
    });

    socket.on('roomUpdated', async ({ oldName, roomName }, callback) => {
      console.log('roomUpdated', roomName);
      const { error, room } = await getRoom(roomName);

      if (error) {
        console.log(error);
        return callback(error);
      }

      if (oldName !== roomName) {
        console.log('roomUpdated old new', oldName, roomName);
        console.log('oldName !== roomName');

        // Switching users to new room if the room name has changed,
        // because otherwise users wouldn't get the new messages
        room.users.forEach((user) => {
          io.sockets.sockets[user.socketId].leave(oldName);
          io.sockets.sockets[user.socketId].join(roomName);
        });

        io.to(room.name).emit(
          'message',
          generateSystemMessage(`Room has been renamed to ${roomName}`)
        );
      }

      socket.broadcast.to(roomName).emit('roomUpdated', room);
    });

    socket.on('userDataRequest', async ({ userId }) => {
      console.log('userDataRequest', userId);
      const { rooms } = await getUserData(userId);
      socket.emit('newUserData', { rooms });
    });

    socket.on('message', async ({ text, roomName, authorId }, callback) => {
      const { message, error } = await createMessage(text, roomName, authorId);

      console.log('createMessage', message.toJSON());

      if (error) {
        return callback(error);
      }

      io.to(roomName).emit('message', message);
      callback();
    });

    socket.on('create', async ({ roomName, authorId }, callback) => {
      console.log('create', roomName, authorId);
      const { error, room } = await createRoom(roomName, authorId, socket.id);

      if (error) {
        return callback({ error });
      }

      const { rooms } = await getUserData(authorId);
      callback({ room, rooms });

      const user = await User.findById(authorId);

      // Joining user immediately after creating room
      socket.join(room.name);
      socket.emit(
        'message',
        generateSystemMessage(`Welcome to the ${room.name}`)
      );
      socket.broadcast
        .to(room.name)
        .emit('message', generateSystemMessage(`${user.username} has joined!`));
    });

    socket.on('join', async ({ roomName, userId }, callback) => {
      console.log('join', roomName, userId);
      const { error, room, alreadyWasInRoom } = await joinRoom(
        roomName,
        userId,
        socket.id
      );

      if (error) {
        return callback({ error });
      }

      const { rooms } = await getUserData(userId);
      callback({ room, rooms });

      const user = await User.findById(userId);

      socket.join(room.name);

      if (!alreadyWasInRoom) {
        socket.emit(
          'message',
          generateSystemMessage(`Welcome to the ${room.name}`)
        );
        socket.broadcast
          .to(room.name)
          .emit(
            'message',
            generateSystemMessage(`${user.username} has joined!`)
          );
      } else {
        // socket.broadcast
        //   .to(room.name)
        //   .emit(
        //     'message',
        //     generateSystemMessage(`${user.username} came online!`)
        //   );
      }

      // TODO: Generate room data to the others
      socket.broadcast
        .to(room.name)
        .emit('roomData', await generateRoomData(room.name));
    });

    socket.on('leave', async ({ roomName, userId }, callback) => {
      console.log('leave', roomName, userId);
      const { error, room } = await leaveRoom(roomName, userId, socket.id);

      if (error) {
        return callback({ error });
      }

      callback({ room });

      const user = await User.findById(userId);

      socket.broadcast
        .to(roomName)
        .emit('message', generateSystemMessage(`${user.username} has left!`));
      socket.broadcast
        .to(roomName)
        .emit('roomData', await generateRoomData(roomName));
    });
  });
};

module.exports = { connectionEvent };
