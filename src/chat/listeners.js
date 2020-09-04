const {
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
} = require('./users');

const connectionEvent = (io) => {
  io.on('connection', (socket) => {
    console.log('New connection', socket.id);

    socket.on('connectUser', async ({ userId }, callback) => {
      console.log('connectUser', userId, socket.id);

      const { error, user } = await connectUser(userId, socket.id);

      callback({ error, user });

      if (error) {
        console.log('connectUser ERROR', error);
        return;
      }

      const rooms = await user.getRoomsNames();
      rooms.forEach((room) => {
        io.to(room).emit('userStatusChanged', user);
      });
    });

    socket.on('disconnect', async () => {
      const { error, user } = await disconnectUser(socket.id);

      console.log('disconnect', user._id, socket.id);

      if (error) {
        console.log('disconnect ERROR', error);
        return;
      }

      const rooms = await user.getRoomsNames();
      rooms.forEach((room) => {
        io.to(room).emit('userStatusChanged', user);
      });
    });

    socket.on('userDataRequest', async ({ userId }, callback) => {
      console.log('userDataRequest', userId);

      const { error, rooms } = await getUserData(userId);

      if (error) {
        console.log('userDataRequest ERROR', error);
        return callback({ error });
      }

      socket.emit('newUserData', { rooms });
    });

    socket.on('message', async ({ text, roomName, authorId }, callback) => {
      console.log('message', text, roomName, authorId);

      const { message, error } = await createMessage(text, roomName, authorId);

      if (error) {
        console.log('message ERROR', error);
        return callback({ error });
      }

      io.to(roomName).emit('message', message);
      callback({ error });
    });

    socket.on('create', async ({ roomName, authorId }, callback) => {
      console.log('create', roomName, authorId);

      const { error, room } = await createRoom(roomName, authorId, socket.id);

      if (error) {
        console.log('create ERROR', error);
        return callback({ error });
      }

      const { rooms } = await getUserData(authorId);
      callback({ room, rooms });

      // Joining user immediately after creating room
      socket.join(room.name);
    });

    socket.on('join', async ({ roomName, userId }, callback) => {
      console.log('join', roomName, userId);

      const { error, room, alreadyIsInRoom } = await joinRoom(
        roomName,
        userId,
        socket.id
      );

      if (error) {
        console.log('join ERROR', error);
        return callback({ error });
      }

      const { error: err, rooms } = await getUserData(userId);

      if (err) {
        console.log('join ERROR', err);
        return callback({ err });
      }

      const { user } = await getUser(userId);

      socket.join(room.name);

      callback({ room, rooms });

      if (!alreadyIsInRoom) {
        const { message, error } = await createSystemMessage(
          `${user.username} has joined!`,
          roomName
        );

        if (error) {
          console.log('join ERROR', error);
          return callback({ error });
        }

        io.to(room.name).emit('message', message);
      }

      // Generate room data to the others
      socket.broadcast
        .to(room.name)
        .emit('roomData', await generateRoomData(room.name));
    });

    socket.on('roomUpdated', async ({ oldName, roomName }, callback) => {
      console.log('roomUpdated', roomName);

      const { error, room } = await getRoom(roomName);

      if (error) {
        console.log('roomUpdated ERROR', error);
        return callback({ error });
      }

      if (oldName !== roomName) {
        // Switching users to new room if the room name has changed,
        // because otherwise users wouldn't get new messages
        room.users.forEach((user) => {
          io.sockets.sockets[user.socketId].leave(oldName);
          io.sockets.sockets[user.socketId].join(roomName);
        });

        const { message, error } = await createSystemMessage(
          `Room has been renamed to ${roomName}`,
          roomName
        );

        if (error) {
          console.log('roomUpdated ERROR', error);
          return callback({ error });
        }

        io.to(room.name).emit('message', message);
      }

      socket.broadcast.to(roomName).emit('roomUpdated', room);
    });

    socket.on('leave', async ({ roomName, userId }, callback) => {
      console.log('leave', roomName, userId);

      const { error, room } = await leaveRoom(roomName, userId);

      if (error) {
        console.log('roomUpdated ERROR', error);
        return callback({ error });
      }

      callback({ room });

      const { user } = await getUser(userId);

      const { message, error: err } = await createSystemMessage(
        `${user.username} has left the room!`,
        roomName
      );

      if (err) {
        console.log(err);
        return callback(err);
      }

      socket.broadcast.to(roomName).emit('message', message);
      socket.broadcast
        .to(roomName)
        .emit('roomData', await generateRoomData(roomName));
    });

    socket.on('deleteRoom', async ({ roomName }, callback) => {
      console.log('deleteRoom', roomName);

      const { error, room } = await deleteRoom(roomName);

      if (error) {
        console.log('deleteRoom ERROR', error);
        return callback({ error });
      }

      io.to(room.name).emit('roomDeleted', room);

      callback({ room });
    });
  });
};

module.exports = { connectionEvent };
