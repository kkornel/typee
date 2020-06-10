import React from 'react';

import { useAuth } from './AuthContext';

const UserContext = React.createContext();

function UserProvider(props) {
  const [currentRoom, setCurrentRoom] = React.useState('');
  // const user = useAuth().data.user;

  const value = React.useMemo(
    () => ({
      // user,
      currentRoom,
      setCurrentRoom,
    }),
    [currentRoom, setCurrentRoom]
  );

  return <UserContext.Provider value={value} {...props} />;
  // return <UserContext.Provider value={useAuth().data.user} {...props} />;
}

function useUser() {
  return React.useContext(UserContext);
}

export { UserProvider, useUser };
