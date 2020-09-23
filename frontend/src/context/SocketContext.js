import React from 'react';

// import { useSocket } from '../utils/useSocket';
// import { useAuth } from './AuthContext';

// import { useRoomData, ACTIONS as ROOM_DATA_ACTIONS } from './RoomDataContext';

const SocketContext = React.createContext();

/**
 * Every time I tried to create Context with socket, the new socket was created
 * (instead of using old one),
 * and server was receiving new connections with new socketId.
 * But still it is TODO
 */

function SocketProvider(props) {
  const socket = null;

  return <SocketContext.Provider value={socket} {...props} />;
}

function useSocketContext() {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
}

export { SocketProvider, useSocketContext };
