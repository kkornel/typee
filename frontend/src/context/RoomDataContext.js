import React from 'react';

import _ from 'lodash';

const ACTIONS = {
  LEAVE_ROOM: 'LEAVE_ROOM',
  LOAD_MESSAGES: 'LOAD_MESSAGES',
  NEW_MESSAGE: 'NEW_MESSAGE',
  ROOM_DELETED: 'ROOM_DELETED',
  SET_CURRENT_ROOM: 'SET_CURRENT_ROOM',
  SET_ROOMS: 'SET_ROOMS',
  UPDATE_ROOM: 'UPDATE_ROOM',
  USER_LIST_CHANGED: 'USER_LIST_CHANGED',
  USER_STATUS_CHANGED: 'USER_STATUS_CHANGED',
};

const initialState = {
  rooms: {},
  currentRoom: undefined,
  // currentRoom: {
  //   messages: [],
  //   users: [],
  // },
};

const RoomDataContext = React.createContext();

function roomDataReducer(state, action) {
  console.log(`roomDataReducer old state`, state);
  console.log(`roomDataReducer ${action.type}`, action.payload);
  switch (action.type) {
    case ACTIONS.LEAVE_ROOM: {
      // Omit the room that was left
      const rooms = _.omit(state.rooms, [action.payload._id]);

      return {
        ...state,
        rooms,
        currentRoom: undefined,
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
    case ACTIONS.NEW_MESSAGE: {
      const message = action.payload;

      const currentRoom = state.currentRoom
        ? {
            ...state.currentRoom,
            messages: [...state.currentRoom.messages, message],
          }
        : null;

      const newState = {
        ...state,
        rooms: {
          ...state.rooms,
          [message.room]: {
            ...state.rooms[message.room],
            messages: [...state.rooms[message.room].messages, message],
          },
        },
        currentRoom,
      };
      console.log('state', newState);
      return newState;
    }
    case ACTIONS.ROOM_DELETED: {
      // Omit the room that was deleted
      const rooms = _.omit(state.rooms, [action.payload._id]);

      // If the deleted room is the current selected room
      // set the current room to undefined
      // so the user will be brought to 'default' page
      const currentRoom =
        state.currentRoom._id === action.payload._id
          ? undefined
          : state.currentRoom;

      return {
        ...state,
        rooms,
        currentRoom,
      };
    }
    case ACTIONS.SET_CURRENT_ROOM: {
      return { ...state, currentRoom: action.payload };
    }
    case ACTIONS.SET_ROOMS: {
      const rooms = _.keyBy(action.payload, '_id');
      const newState = { ...state, rooms };
      console.log('state', newState);
      return newState;
    }
    case ACTIONS.UPDATE_ROOM: {
      // TODO: Here it's loading whole room, with users, messages etc.
      // Is it necessary?
      const { name, avatarURL } = action.payload;
      const currentRoom = state.currentRoom
        ? {
            ...state.currentRoom,
            name,
            avatarURL,
          }
        : null;
      const st = {
        ...state,
        rooms: { ...state.rooms, [action.payload._id]: { ...action.payload } },
        currentRoom,
      };

      console.log('!!!', currentRoom);
      console.log('!!!', st);

      return st;
    }
    case ACTIONS.USER_LIST_CHANGED: {
      const currentRoom = state.currentRoom
        ? {
            ...state.currentRoom,
            users: action.payload,
          }
        : null;

      return {
        ...state,
        currentRoom,
      };
    }
    case ACTIONS.USER_STATUS_CHANGED: {
      if (!state.currentRoom) {
        return { ...state };
      }

      const users = [...state.currentRoom.users];
      const index = users.findIndex((user) => user._id === action.payload._id);
      users[index] = action.payload;
      const currentRoom = state.currentRoom
        ? {
            ...state.currentRoom,
            users,
          }
        : null;
      return {
        ...state,
        currentRoom,
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
