import React from 'react';

import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

function useSocket(endpoint = ENDPOINT) {
  // Approach #1
  // const [socket, setSocket] = React.useState();

  // Approach #2
  const socket = io(endpoint);

  // Approach #1
  function connect(endpoint = ENDPOINT) {
    // setSocket(io(endpoint));
  }

  function sendMessage(text, roomName, userId, callback) {
    socket.emit('message', text, roomName, userId, callback);
  }

  function newMessageHandler(onMessageReceived) {
    socket.on('message', onMessageReceived);
  }

  function roomDataHandler(onRoomDataReceived) {
    socket.on('roomData', onRoomDataReceived);
  }

  function createRoom(userId, roomName, callback) {
    socket.emit('create', { roomName, userId }, callback);
  }

  function joinRoom(userId, roomName, callback) {
    socket.emit('join', { roomName, userId }, callback);
  }

  function leaveRoom(userId, roomName, callback) {
    socket.emit('leave', { roomName, userId }, callback);
  }

  return {
    connect,
    sendMessage,
    newMessageHandler,
    roomDataHandler,
    createRoom,
    joinRoom,
    leaveRoom,
  };
}

export { useSocket };
