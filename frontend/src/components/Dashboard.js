import React from 'react';

import { useAuth } from '../context/AuthContext';
import { useSocket } from '../utils/useSocket';

import ChatDashboard from './Chat/ChatDashboard';

function Dashboard() {
  const { user } = useAuth();

  const {
    connect,
    sendMessage,
    newMessageHandler,
    newUserDataHandler,
    roomDataHandler,
    createRoom,
    joinRoom,
    leaveRoom,
    requestUserData,
  } = useSocket();

  console.log('&&& Dashboard RE-RENDER');

  return (
    <ChatDashboard
      user={user}
      connect={connect}
      sendMessage={sendMessage}
      newMessageHandler={newMessageHandler}
      newUserDataHandler={newUserDataHandler}
      requestUserData={requestUserData}
      roomDataHandler={roomDataHandler}
      createRoom={createRoom}
      joinRoom={joinRoom}
      leaveRoom={leaveRoom}
    />
  );
}

export default Dashboard;
