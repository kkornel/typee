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

const {
  CONNECTION,
  CONNECT_USER,
  DISCONNECT,
  USER_DATA_REQUEST,
  MESSAGE,
  CREATE_ROOM,
  JOIN_ROOM,
  LEAVE_ROOM,
  DELETE_ROOM,
  ROOM_UPDATED,
  REMOVE_USER,
  ROOM_DATA,
  USER_STATUS_CHANGED,
  ROOM_DELETED,
} = require('./events');

const connectionEvent = (io) => {
  io.on(CONNECTION, (socket) => {
    console.log('==============================');
    console.log('New connection', socket.id);
    console.log('==============================');

    socket.on(CONNECT_USER, async ({ userId }, callback) => {
      console.log(CONNECT_USER, userId, socket.id);

      const { error, user } = await connectUser(userId, socket.id);
      const { rooms } = await getUserRoomsWithoutUserSockets(userId);

      callback({ error, user, rooms });

      if (error) {
        console.log(`${CONNECT_USER} ERROR`, error);
        return;
      }

      rooms.forEach(async ({ name }) => {
        await joinRoom(name, userId, socket.id);
        socket.join(name);
        io.to(name).emit(USER_STATUS_CHANGED, user);
      });
    });

    socket.on(DISCONNECT, async () => {
      const { error, user } = await disconnectUser(socket.id);

      console.log(DISCONNECT, user._id, socket.id);

      if (error) {
        console.log(`${DISCONNECT} ERROR`, error);
        return;
      }

      const rooms = await user.getRoomsNames();
      rooms.forEach((room) => {
        io.to(room).emit(USER_STATUS_CHANGED, user);
      });
    });

    socket.on(USER_DATA_REQUEST, async ({ userId }, callback) => {
      console.log(USER_DATA_REQUEST, userId);

      const { error, user, rooms } = await getUserData(userId);

      callback({ error, user, rooms });

      if (error) {
        console.log(`${USER_DATA_REQUEST} ERROR`, error);
      }
    });

    socket.on(MESSAGE, async ({ text, roomId, authorId }, callback) => {
      console.log(MESSAGE, text, roomId, authorId);

      const { error, room, message } = await createMessage(
        text,
        roomId,
        authorId
      );

      if (error) {
        console.log(`${MESSAGE} ERROR`, error);
        return callback({ error });
      }

      io.to(room.name).emit(MESSAGE, message);
      callback({ error });
    });

    socket.on(CREATE_ROOM, async ({ roomName, authorId }, callback) => {
      console.log(CREATE_ROOM, roomName, authorId);

      const { error, room } = await createRoom(roomName, authorId, socket.id);

      if (error) {
        console.log(`${CREATE_ROOM} ERROR`, error);
        return callback({ error });
      }

      const { rooms } = await getUserRoomsWithoutUserSockets(authorId);
      callback({ room, rooms });

      // Joining user immediately after creating room
      socket.join(room.name);
    });

    socket.on(JOIN_ROOM, async ({ roomName, userId }, callback) => {
      console.log(JOIN_ROOM, roomName, userId);

      const { error, room, alreadyIsInRoom } = await joinRoom(
        roomName,
        userId,
        socket.id
      );

      if (error) {
        console.log(`${JOIN_ROOM} ERROR`, error);
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
          console.log(`${JOIN_ROOM} ERROR`, error);
          return callback({ error });
        }

        io.to(room.name).emit(MESSAGE, message);

        // Generate room data to the others
        socket.broadcast
          .to(room.name)
          .emit(ROOM_DATA, await generateRoomData(room._id));
      }
    });

    socket.on(ROOM_UPDATED, async ({ oldName, roomName }, callback) => {
      console.log(ROOM_UPDATED, roomName);

      const { error, room } = await getRoomByName(roomName);

      if (error) {
        console.log(`${ROOM_UPDATED} ERROR`, error);
        return callback({ error });
      }

      // await room.populate('author').execPopulate();

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
          console.log(`${ROOM_UPDATED} ERROR`, error);
          return callback({ error });
        }

        io.to(room.name).emit(MESSAGE, message);
      }

      socket.broadcast.to(roomName).emit(ROOM_UPDATED, room);
    });

    socket.on(REMOVE_USER, async ({ roomId, userId }, callback) => {
      const { room, user } = await removeUser(roomId, userId);

      callback({ room, user });

      if (user.socketId) {
        io.sockets.sockets[user.socketId].emit(ROOM_DELETED, room);
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
          io.sockets.sockets[user.socketId].emit(ROOM_UPDATED, room);
        }
      });
    });

    socket.on(LEAVE_ROOM, async ({ roomName, userId }, callback) => {
      console.log(LEAVE_ROOM, roomName, userId);

      const { error, room } = await leaveRoom(roomName, userId);

      if (error) {
        console.log(`${LEAVE_ROOM} ERROR`, error);
        return callback({ error });
      }

      callback({ room });

      const { user } = await getUserById(userId);

      const { message } = await createSystemMessage(
        `${user.username} has left the room!`,
        roomName
      );

      socket.broadcast.to(roomName).emit(MESSAGE, message);
      socket.broadcast
        .to(roomName)
        .emit(ROOM_DATA, await generateRoomData(room._id));
    });

    socket.on(DELETE_ROOM, async ({ roomName }, callback) => {
      console.log(DELETE_ROOM, roomName);

      const { error, room } = await deleteRoom(roomName);

      if (error) {
        console.log(`${DELETE_ROOM} ERROR`, error);
        return callback({ error });
      }

      socket.broadcast.to(room.name).emit(ROOM_DELETED, room);

      callback({ room });
    });
  });
};

module.exports = connectionEvent;
