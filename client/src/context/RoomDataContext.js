import React from 'react';
import _ from 'lodash';

import {
  LEAVE_ROOM,
  LOAD_MESSAGES,
  NEW_MESSAGE,
  ROOM_DELETED,
  SET_CURRENT_ROOM,
  SET_ROOMS,
  UPDATE_ROOM,
  USER_LIST_CHANGED,
  USER_STATUS_CHANGED,
} from './actions/roomData';

const initialState = {
  rooms: {},
  currentRoom: undefined,
};

const RoomDataContext = React.createContext();

function roomDataReducer(state, action) {
  console.log(`roomDataReducer old state`, state);
  // console.log(`roomDataReducer ${action.type}`, action.payload);
  switch (action.type) {
    case LEAVE_ROOM: {
      // Omit the room that was left
      const rooms = _.omit(state.rooms, [action.payload._id]);

      const newState = {
        ...state,
        rooms,
        currentRoom: undefined,
      };

      console.log('newState LEAVE_ROOM', newState);
      return newState;
    }
    case LOAD_MESSAGES: {
      const newState = {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          messages: [...action.payload],
        },
      };

      console.log('newState LOAD_MESSAGES', newState);
      return newState;
    }
    case NEW_MESSAGE: {
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

      console.log('newState NEW_MESSAGE', newState);
      return newState;
    }
    case ROOM_DELETED: {
      // Omit the room that was deleted
      const rooms = _.omit(state.rooms, [action.payload._id]);

      // If the deleted room is the current selected room
      // set the current room to undefined
      // so the user will be brought to 'default' page
      const currentRoom =
        state.currentRoom && state.currentRoom._id === action.payload._id
          ? undefined
          : state.currentRoom;

      const newState = {
        ...state,
        rooms,
        currentRoom,
      };

      console.log('newState ROOM_DELETED', newState);
      return newState;
    }
    case SET_CURRENT_ROOM: {
      const newState = { ...state, currentRoom: action.payload };

      console.log('newState SET_CURRENT_ROOM', newState);
      return newState;
    }
    case SET_ROOMS: {
      const rooms = _.keyBy(action.payload, '_id');

      const newState = { ...state, rooms };

      console.log('newState SET_ROOMS', newState);
      return newState;
    }
    case UPDATE_ROOM: {
      const currentRoom = state.currentRoom
        ? {
            ...state.currentRoom,
            ...action.payload,
          }
        : null;

      const newState = {
        ...state,
        rooms: { ...state.rooms, [action.payload._id]: { ...action.payload } },
        currentRoom,
      };

      console.log('newState UPDATE_ROOM', newState);
      return newState;
    }
    case USER_LIST_CHANGED: {
      const currentRoom = state.currentRoom
        ? {
            ...state.currentRoom,
            users: action.payload,
          }
        : null;

      const newState = {
        ...state,
        currentRoom,
      };

      console.log('newState USER_LIST_CHANGED', newState);
      return newState;
    }
    case USER_STATUS_CHANGED: {
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

      const newState = {
        ...state,
        currentRoom,
      };

      console.log('newState USER_STATUS_CHANGED', newState);
      return newState;
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

export { RoomDataProvider, useRoomData };

// const ACTIONS = {
//   LEAVE_ROOM: 'LEAVE_ROOM',
//   LOAD_MESSAGES: 'LOAD_MESSAGES',
//   NEW_MESSAGE: 'NEW_MESSAGE',
//   ROOM_DELETED: 'ROOM_DELETED',
//   SET_CURRENT_ROOM: 'SET_CURRENT_ROOM',
//   SET_ROOMS: 'SET_ROOMS',
//   UPDATE_ROOM: 'UPDATE_ROOM',
//   USER_LIST_CHANGED: 'USER_LIST_CHANGED',
//   USER_STATUS_CHANGED: 'USER_STATUS_CHANGED',
// };

// export { ACTIONS, RoomDataProvider, useRoomData };
