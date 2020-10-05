// import React from 'react';

import io from 'socket.io-client';

import {
  CONNECT_USER,
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
} from './consts/events';

const ENDPOINT = 'http://localhost:5000';

function useSocket(endpoint = ENDPOINT) {
  // Approach #1
  // const [socket, setSocket] = React.useState();

  // Approach #2
  // Dev
  // const socket = io(endpoint);

  // Prod
  const socket = io({ path: '/socket.io' });

  // Approach #1
  // function connect(endpoint = ENDPOINT) {
  //   setSocket(io(endpoint));
  // }

  function connect(userId, callback) {
    socket.emit(CONNECT_USER, { userId }, callback);
  }

  function disconnet() {
    socket.disconnect();
  }

  function requestUserData(userId, callback) {
    socket.emit(USER_DATA_REQUEST, { userId }, callback);
  }

  function sendMessage(text, roomId, authorId, callback) {
    socket.emit(MESSAGE, { text, roomId, authorId }, callback);
  }

  function createRoom(authorId, roomName, callback) {
    socket.emit(CREATE_ROOM, { roomName, authorId }, callback);
  }

  function joinRoom(userId, roomName, callback) {
    socket.emit(JOIN_ROOM, { roomName, userId }, callback);
  }

  function roomUpdated(oldName, roomName, callback) {
    socket.emit(ROOM_UPDATED, { oldName, roomName }, callback);
  }

  function leaveRoom(userId, roomName, callback) {
    socket.emit(LEAVE_ROOM, { roomName, userId }, callback);
  }

  function deleteRoom(roomName, callback) {
    socket.emit(DELETE_ROOM, { roomName }, callback);
  }

  function removeUser(roomId, userId, callback) {
    socket.emit(REMOVE_USER, { roomId, userId }, callback);
  }

  function onRoomUpdated(callback) {
    socket.on(ROOM_UPDATED, callback);
  }

  function onNewMessage(callback) {
    socket.on(MESSAGE, callback);
  }

  function onNewRoomData(callback) {
    socket.on(ROOM_DATA, callback);
  }

  function onUserStatusChanged(callback) {
    socket.on(USER_STATUS_CHANGED, callback);
  }

  function onRoomDeleted(callback) {
    socket.on(ROOM_DELETED, callback);
  }

  return {
    connect,
    sendMessage,
    requestUserData,
    createRoom,
    joinRoom,
    leaveRoom,
    roomUpdated,
    removeUser,
    onRoomUpdated,
    onNewMessage,
    onNewRoomData,
    onUserStatusChanged,
    disconnet,
    deleteRoom,
    onRoomDeleted,
  };
}

export { useSocket };
