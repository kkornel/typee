const {
  createRoom,
  joinRoom,
  generateMessage,
  createMessage,
  leaveRoom,
  generateRoomData,
  getUserData,
} = require('./users');

const connectionEvent = (io) => {
  io.on('connection', (socket) => {
    console.log('New connection', socket.id);

    socket.on('userDataRequest', async ({ userId }) => {
      console.log('userDataRequest', userId);
      const { rooms } = await getUserData(userId);
      socket.emit('newUserData', { rooms });
    });

    socket.on('message', async ({ text, roomName, authorId }, callback) => {
      console.log('message', text, roomName, authorId);
      const { message, error } = await createMessage(text, roomName, authorId);

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

      // Joining user immediately after creating room
      socket.join(room.name);
      socket.emit('message', generateMessage(`Welcome to the ${room.name}`));
      socket.broadcast
        .to(room.name)
        .emit('message', generateMessage(`${authorId} has joined!`));
    });

    socket.on('join', async ({ roomName, userId }, callback) => {
      console.log('join', roomName, userId);
      const { error, room } = await joinRoom(roomName, userId, socket.id);

      if (error) {
        return callback({ error });
      }

      const { rooms } = await getUserData(userId);
      callback({ room, rooms });

      socket.join(room.name);
      socket.emit('message', generateMessage(`Welcome to the ${room.name}`));
      socket.broadcast
        .to(room.name)
        .emit('message', generateMessage(`${userId} has joined!`));

      // TODO: Generate room data to the others
      socket.broadcast
        .to(room.name)
        .emit('roomData', await generateRoomData(room.name));
    });

    socket.on('leave', async ({ roomName, userId }, callback) => {
      console.log('leave', roomName, userId);
      const { error, room } = await leaveRoom(roomName, userId, socket.id);

      if (error) {
        callback({ error });
      }

      callback();

      socket.broadcast
        .to(roomName)
        .emit('message', generateMessage(`${userId} has left!`));
      socket.broadcast
        .to(roomName)
        .emit('roomData', await generateRoomData(roomName));
    });

    socket.on('disconnect', () => {
      console.log('disconnect', socket.id);
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
  });
};

module.exports = { connectionEvent };
