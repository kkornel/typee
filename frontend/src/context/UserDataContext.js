import React from 'react';

const LAST_OPENED_ROOM_KEY = 'lastOpenedRoom';

const initialState = {
  rooms: {},
};

const UserDataContext = React.createContext();

const userDataReducer = (state, action) => {
  // console.log('userDataReducer', state, action);
  switch (action.type) {
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function UserDataProvider(props) {
  const [state, dispatch] = React.useReducer(userDataReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <UserDataContext.Provider value={value} {...props} />;
}

function useUserData() {
  const context = React.useContext(UserDataContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const [state, dispatch] = context;

  const setLastOpenedRoom = React.useCallback((lastOpenedRoom) => {
    localStorage.setItem(LAST_OPENED_ROOM_KEY, lastOpenedRoom);
  }, []);

  const getLastOpenedRoom = React.useCallback(() => {
    return localStorage.getItem(LAST_OPENED_ROOM_KEY);
  }, []);

  const handleRoomDeleted = (roomName) => {
    if (getLastOpenedRoom() === roomName) {
      setLastOpenedRoom(null);
    }
  };

  return {
    state,
    dispatch,
    setLastOpenedRoom,
    getLastOpenedRoom,
    handleRoomDeleted,
  };
}

export { useUserData, UserDataProvider };
