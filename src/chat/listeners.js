const {
  createRoom,
  joinRoom,
  generateMessage,
  createMessage,
  leaveRoom,
  generateRoomData,
} = require('./users');

const connectionEvent = (io) => {
  io.on('connection', (socket) => {
    console.log('New connection');

    socket.on('create', async ({ roomName, userId }, callback) => {
      console.log('create', roomName, userId);
      const { error, room } = await createRoom(roomName, userId, socket.id);

      callback({ error, room });
    });

    socket.on('join', async ({ roomName, userId }, callback) => {
      console.log('join', roomName, userId);
      const { error, room } = await joinRoom(roomName, userId, socket.id);

      callback({ error, room });

      socket.join(room.name);

      socket.emit('message', generateMessage(`Welcome to the ${room.name}`));
      socket.broadcast
        .to(room.name)
        .emit('message', generateMessage(`${userId} has joined!`));

      // TODO: Generate room data
    });

    socket.on('leave', async ({ roomName, userId }, callback) => {
      console.log('leave', roomName, userId);
      const { error, room } = await leaveRoom(roomName, userId, socket.id);

      socket.broadcast
        .to(roomName)
        .emit('message', generateMessage(`${userId} has left!`));

      socket.broadcast
        .to(roomName)
        .emit('roomData', await generateRoomData(roomName));
    });

    socket.on('sendMessage', async ({ text, roomName, userId }, callback) => {
      const { error, message } = await createMessage(text, roomName, userId);

      io.to(roomName).emit('message', message);

      callback(error);
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
