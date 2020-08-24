import React from 'react';

const LAST_OPENED_ROOM_KEY = 'lastOpenedRoom';

const ACTIONS = {
  SET_ROOMS: 'SET_ROOMS',
  UPDATE_ROOM: 'UPDATE_ROOM',
};

const initialState = {
  rooms: {},
};

const UserDataContext = React.createContext();

const userDataReducer = (state, action) => {
  console.log('userDataReducer', state, action);
  switch (action.type) {
    case ACTIONS.SET_ROOMS: {
      const rooms = action.payload.reduce((accumulator, currentValue) => {
        return {
          ...accumulator,
          [currentValue._id]: currentValue,
        };
      }, {});
      console.log('userDataReducer state', state);
      console.log('userDataReducer rooms', rooms);
      return { ...state, rooms: { ...state.rooms, ...rooms } };
    }
    case ACTIONS.UPDATE_ROOM: {
      // TODO: Here it's loading whole room, with users, messages etc.
      // Is it necessary?
      console.log('userDataReducer new', state);
      console.log('userDataReducer old', {
        ...state,
        rooms: { ...state.rooms, [action.payload._id]: action.payload },
      });
      return {
        ...state,
        rooms: { ...state.rooms, [action.payload._id]: action.payload },
      };
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

  return {
    state,
    dispatch,
    setLastOpenedRoom,
    getLastOpenedRoom,
  };
}

export { ACTIONS, useUserData, UserDataProvider };
