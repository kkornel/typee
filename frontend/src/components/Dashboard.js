import React from 'react';

import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../utils/useSocket';

import ChatDashboard from './Chat/ChatDashboard';

function Dashboard() {
  const { user } = useAuth();

  const {
    connect,
    sendMessage,
    newMessageHandler,
    roomDataHandler,
    createRoom,
    joinRoom,
    leaveRoom,
  } = useSocket();

  console.log('&&& Dashboard RE-RENDER');

  return (
    <ChatDashboard
      user={user}
      connect={connect}
      sendMessage={sendMessage}
      newMessageHandler={newMessageHandler}
      roomDataHandler={roomDataHandler}
      createRoom={createRoom}
      joinRoom={joinRoom}
      leaveRoom={leaveRoom}
    />
  );
}

export default Dashboard;
