// import React from 'react';

import io from 'socket.io-client';
import { Paper } from '@material-ui/core';

const ENDPOINT = 'http://localhost:5000';

function useSocket(endpoint = ENDPOINT) {
  // Approach #1
  // const [socket, setSocket] = React.useState();

  // Approach #2
  const socket = io(endpoint);

  // Approach #1
  // function connect(endpoint = ENDPOINT) {
  //   setSocket(io(endpoint));
  // }

  function connect(userId, callback) {
    socket.emit('connectUser', { userId }, callback);
  }

  function disconnet() {
    socket.disconnect();
  }

  function requestUserData(userId, callback) {
    socket.emit('userDataRequest', { userId });
  }

  function sendMessage(text, roomName, authorId, callback) {
    socket.emit('message', { text, roomName, authorId }, callback);
  }

  function createRoom(authorId, roomName, callback) {
    socket.emit('create', { roomName, authorId }, callback);
  }

  function joinRoom(userId, roomName, callback) {
    socket.emit('join', { roomName, userId }, callback);
  }

  function roomUpdated(oldName, roomName, callback) {
    socket.emit('roomUpdated', { oldName, roomName }, callback);
  }

  function leaveRoom(userId, roomName, callback) {
    socket.emit('leave', { roomName, userId }, callback);
  }

  function deleteRoom(roomName, callback) {
    socket.emit('deleteRoom', { roomName }, callback);
  }

  function onRoomUpdated(callback) {
    socket.on('roomUpdated', callback);
  }

  function onNewMessage(callback) {
    socket.on('message', callback);
  }

  function onNewRoomData(callback) {
    socket.on('roomData', callback);
  }

  function onNewUserData(callback) {
    socket.on('newUserData', callback);
  }

  function onUserStatusChanged(callback) {
    socket.on('userStatusChanged', callback);
  }

  function onRoomDeleted(callback) {
    socket.on('roomDeleted', callback);
  }

  return {
    connect,
    sendMessage,
    requestUserData,
    createRoom,
    joinRoom,
    leaveRoom,
    roomUpdated,
    onRoomUpdated,
    onNewMessage,
    onNewRoomData,
    onNewUserData,
    onUserStatusChanged,
    disconnet,
    deleteRoom,
    onRoomDeleted,
  };
}

export { useSocket };
