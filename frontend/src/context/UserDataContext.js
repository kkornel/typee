import React from 'react';

const LAST_OPENED_ROOM_KEY = 'lastOpenedRoom';

const UserDataContext = React.createContext();

function UserDataProvider(props) {
  const [rooms, setRooms] = React.useState([]);

  const setLastOpenedRoom = React.useCallback((lastOpenedRoom) => {
    localStorage.setItem(LAST_OPENED_ROOM_KEY, lastOpenedRoom);
  }, []);

  const getLastOpenedRoom = React.useCallback(() => {
    return localStorage.getItem(LAST_OPENED_ROOM_KEY);
  }, []);

  const value = React.useMemo(
    () => ({
      getLastOpenedRoom,
      setLastOpenedRoom,
      rooms,
      setRooms,
    }),
    [getLastOpenedRoom, setLastOpenedRoom, rooms, setRooms]
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
