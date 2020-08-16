import React from 'react';

const UserDataContext = React.createContext();

function UserDataProvider(props) {
  const [currentRoom, setCurrentRoom] = React.useState('');
  const [rooms, setRooms] = React.useState([]);

  const value = React.useMemo(
    () => ({
      currentRoom,
      setCurrentRoom,
      rooms,
      setRooms,
    }),
    [currentRoom, setCurrentRoom, rooms, setRooms]
  );

  return <UserDataContext.Provider value={value} {...props} />;
}

function useUserData() {
  const context = React.useContext(UserDataContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export { UserDataProvider, useUserData };
