// import React from 'react';

import io from 'socket.io-client';

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
    console.log('connect');
    socket.emit('connectUser', { userId }, callback);
  }

  function sendMessage(text, roomName, authorId, callback) {
    socket.emit('message', { text, roomName, authorId }, callback);
  }

  function requestUserData(userId) {
    socket.emit('userDataRequest', { userId });
  }

  function createRoom(authorId, roomName, callback) {
    socket.emit('create', { roomName, authorId }, callback);
  }

  function joinRoom(userId, roomName, callback) {
    socket.emit('join', { roomName, userId }, callback);
  }

  function leaveRoom(userId, roomName, callback) {
    socket.emit('leave', { roomName, userId }, callback);
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

  function disconnet() {
    socket.disconnect();
  }

  return {
    connect,
    sendMessage,
    requestUserData,
    createRoom,
    joinRoom,
    leaveRoom,
    onNewMessage,
    onNewRoomData,
    onNewUserData,
    onUserStatusChanged,
    disconnet,
  };
}

export { useSocket };
