import React from 'react';

import { useAuth } from '../context/AuthContext';
import { useSocket } from '../utils/useSocket';

import ChatDashboard from './Chat/ChatDashboard';

function Dashboard() {
  const { user } = useAuth();

  // const {
  //   connect,
  //   sendMessage,
  //   requestUserData,
  //   createRoom,
  //   joinRoom,
  //   leaveRoom,
  //   onNewMessage,
  //   onNewRoomData,
  //   onNewUserData,
  //   onUserStatusChanged,
  //   disconnet,
  // } = useSocket();

  const socket = useSocket();

  console.log('&&& Dashboard RE-RENDER');

  return <ChatDashboard socket={socket} user={user} />;
}

export default Dashboard;
