import React from 'react';

import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

const socket = io(ENDPOINT);

function messageHandler(onMessageReceived) {
  socket.on('message', onMessageReceived);
}

function sendMessage(text, roomName, userId, callback) {
  socket.emit('sendMessage', { text, roomName, userId }, callback);
}

function createRoom(userId, roomName, callback) {
  socket.emit('create', { roomName, userId }, callback);
}

function joinRoom(userId, roomName, callback) {
  socket.emit('join', { roomName, userId }, callback);
}

function leaveRoom(userId, roomName, callback) {
  console.log(userId, roomName);
  socket.emit('leave', { roomName, userId }, callback);
}

function roomDataHandler(onRoomDataReceived) {
  socket.on('roomData', onRoomDataReceived);
}

export {
  messageHandler,
  sendMessage,
  joinRoom,
  createRoom,
  leaveRoom,
  roomDataHandler,
};
