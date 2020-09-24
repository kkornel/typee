const {
  getUserById,
  getRoomByName,
  getRoomById,
  getUserRoomsWithoutUserSockets,
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
} = require('./users');

const connectionEvent = (io) => {
  io.on('connection', (socket) => {
    console.log('==============================');
    console.log('New connection', socket.id);
    console.log('==============================');

    socket.on('connectUser', async ({ userId }, callback) => {
      console.log('connectUser', userId, socket.id);

      const { error, user } = await connectUser(userId, socket.id);
      const { rooms } = await getUserRoomsWithoutUserSockets(userId);

      callback({ error, user, rooms });

      if (error) {
        console.log('connectUser ERROR', error);
        return;
      }

      rooms.forEach(async ({ name }) => {
        await joinRoom(name, userId, socket.id);
        socket.join(name);
        io.to(name).emit('userStatusChanged', user);
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

      const { error, user, rooms } = await getUserData(userId);

      callback({ error, user, rooms });

      if (error) {
        console.log('userDataRequest ERROR', error);
      }
    });

    socket.on('message', async ({ text, roomId, authorId }, callback) => {
      console.log('message', text, roomId, authorId);

      const { error, room, message } = await createMessage(
        text,
        roomId,
        authorId
      );

      if (error) {
        console.log('message ERROR', error);
        return callback({ error });
      }

      io.to(room.name).emit('message', message);
      callback({ error });
    });

    socket.on('create', async ({ roomName, authorId }, callback) => {
      console.log('create', roomName, authorId);

      const { error, room } = await createRoom(roomName, authorId, socket.id);

      if (error) {
        console.log('create ERROR', error);
        return callback({ error });
      }

      const { rooms } = await getUserRoomsWithoutUserSockets(authorId);
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

      const { rooms } = await getUserRoomsWithoutUserSockets(userId);
      const { user } = await getUserById(userId);

      socket.join(room.name);

      // alreadyIsInRoom ? callback({ room }) : callback({ room, rooms });
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

        // Generate room data to the others
        socket.broadcast
          .to(room.name)
          .emit('roomData', await generateRoomData(room._id));
      }
    });

    socket.on('roomUpdated', async ({ oldName, roomName }, callback) => {
      console.log('roomUpdated', roomName);

      const { error, room } = await getRoomByName(roomName);

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

    socket.on('removeUser', async ({ roomId, userId }, callback) => {
      const { room, user } = await removeUser(roomId, userId);

      callback({ room, user });

      if (user.socketId) {
        io.sockets.sockets[user.socketId].emit('roomDeleted', room);
      }

      const { room: roomWithUserSockets } = await getRoomById(roomId);
      roomWithUserSockets.users.forEach((user) => {
        // Sending room updated only to others that are left in the room
        // except the owner, who is notified by callback
        if (
          user.socketId &&
          user.socketId !== socket.id &&
          io.sockets.sockets[user.socketId]
        ) {
          io.sockets.sockets[user.socketId].emit('roomUpdated', room);
        }
      });
    });

    socket.on('leave', async ({ roomName, userId }, callback) => {
      console.log('leave', roomName, userId);

      const { error, room } = await leaveRoom(roomName, userId);

      if (error) {
        console.log('leave ERROR', error);
        return callback({ error });
      }

      callback({ room });

      const { user } = await getUserById(userId);

      const { message } = await createSystemMessage(
        `${user.username} has left the room!`,
        roomName
      );

      socket.broadcast.to(roomName).emit('message', message);
      socket.broadcast
        .to(roomName)
        .emit('roomData', await generateRoomData(room._id));
    });

    socket.on('deleteRoom', async ({ roomName }, callback) => {
      console.log('deleteRoom', roomName);

      const { error, room } = await deleteRoom(roomName);

      if (error) {
        console.log('deleteRoom ERROR', error);
        return callback({ error });
      }

      socket.broadcast.to(room.name).emit('roomDeleted', room);

      callback({ room });
    });
  });
};

module.exports = connectionEvent;
