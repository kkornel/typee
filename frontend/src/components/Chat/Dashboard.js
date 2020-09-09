import React from 'react';

import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../utils/useSocket';

import ChatDashboard from './ChatDashboard';

function Dashboard() {
  const { user } = useAuth();
  const socket = useSocket();
  console.log('&&& Dashboard RE-RENDER');

  return <ChatDashboard socket={socket} user={user} />;
}

export default Dashboard;
