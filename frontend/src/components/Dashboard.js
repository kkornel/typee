import React from 'react';

import { useAuth } from '../context/AuthContext';
import { useSocket } from '../utils/useSocket';
// import { useRoomData } from '../utils/useRoomData';

import ChatDashboard from './Chat/ChatDashboard';

function Dashboard() {
  const { user } = useAuth();

  // const { currentRoom, messages, dispatch } = useRoomData();

  const {
    connect,
    sendMessage,
    newMessageHandler,
    newUserDataHandler,
    unregisterMessageHandler,
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
      unregisterMessageHandler={unregisterMessageHandler}
      requestUserData={requestUserData}
      roomDataHandler={roomDataHandler}
      createRoom={createRoom}
      joinRoom={joinRoom}
      leaveRoom={leaveRoom}
      // currentRoomLOL={currentRoom}
      // messagesLOL={messages}
      // dispatchLOL={dispatch}
    />
  );
}

export default Dashboard;
