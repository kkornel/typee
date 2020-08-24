import React from 'react';

import _ from 'lodash';

const ACTIONS = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  LOAD_MESSAGES: 'LOAD_MESSAGES',
  SET_CURRENT_ROOM: 'SET_CURRENT_ROOM',
  USER_LIST_CHANGED: 'USER_LIST_CHANGED',
  LOAD_ROOM: 'LOAD_ROOM',
  USER_STATUS_CHANGED: 'USER_STATUS_CHANGED',
  SET_ROOMS: 'SET_ROOMS',
  UPDATE_ROOM: 'UPDATE_ROOM',
};

const initialState = {
  rooms: {},
  currentRoom: {
    messages: [],
    users: [],
  },
};

const RoomDataContext = React.createContext();

function roomDataReducer(state, action) {
  console.log(`roomDataReducer old state`, state);
  console.log(`roomDataReducer ${action.type}`, action.payload);
  switch (action.type) {
    case ACTIONS.SET_ROOMS: {
      const rooms = _.keyBy(action.payload, '_id');
      return { ...state, rooms: { ...state.rooms, ...rooms } };
    }
    case ACTIONS.UPDATE_ROOM: {
      // TODO: Here it's loading whole room, with users, messages etc.
      // Is it necessary?
      const { name, avatar, avatarURL } = action.payload;
      return {
        ...state,
        rooms: { ...state.rooms, [action.payload._id]: action.payload },
        currentRoom: {
          ...state.currentRoom,
          name,
          avatar,
          avatarURL,
        },
      };
    }
    case ACTIONS.NEW_MESSAGE: {
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          messages: [...state.currentRoom.messages, action.payload],
        },
      };
    }
    case ACTIONS.LOAD_MESSAGES: {
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          messages: [...action.payload],
        },
      };
    }
    case ACTIONS.SET_CURRENT_ROOM: {
      return { ...state, currentRoom: action.payload };
    }
    case ACTIONS.USER_LIST_CHANGED: {
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          users: action.payload,
        },
      };
    }
    case ACTIONS.USER_STATUS_CHANGED: {
      const users = state.currentRoom.users.find((user) => {
        if (user._id === action.payload._id) {
          user.online = action.payload.online;
        }
        return user;
      });
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          users,
        },
      };
    }
    case ACTIONS.LOAD_ROOM: {
      return {
        ...state,
        currentRoom: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function RoomDataProvider(props) {
  const [state, dispatch] = React.useReducer(roomDataReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <RoomDataContext.Provider value={value} {...props} />;
}

function useRoomData() {
  const context = React.useContext(RoomDataContext);
  if (context === undefined) {
    throw new Error('useRoomData must be used within a RoomDataProvider');
  }
  return context;
}

export { ACTIONS, RoomDataProvider, useRoomData };
