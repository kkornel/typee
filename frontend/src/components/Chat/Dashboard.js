import React from 'react';

import ChatDashboard from './ChatDashboard';

import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../utils/useSocket';

function Dashboard() {
  const { user } = useAuth();
  const socket = useSocket();

  React.useEffect(() => {
    return () => {
      socket.disconnet();
    };
  }, []);

  return <ChatDashboard socket={socket} user={user} />;
}

export default Dashboard;
