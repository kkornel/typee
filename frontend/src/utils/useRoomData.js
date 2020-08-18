import React from 'react';

const ACTIONS = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  LOAD_MESSAGES: 'LOAD_MESSAGES',
  SET_CURRENT_ROOM: 'SET_CURRENT_ROOM',
  USER_LIST_CHANGED: 'USER_LIST_CHANGED',
  LOAD_ROOM: 'LOAD_ROOM',
  USER_STATUS_CHANGED: 'USER_STATUS_CHANGED',
};

const initialState = {
  currentRoom: null,
  messages: [],
  users: [],
};

function roomDataReducer(state, action) {
  console.log('roomDataReducer', state, action);
  switch (action.type) {
    case ACTIONS.NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case ACTIONS.LOAD_MESSAGES:
      return { ...state, messages: [...action.payload] };
    case ACTIONS.SET_CURRENT_ROOM:
      return { ...state, currentRoom: action.payload };
    case ACTIONS.USER_LIST_CHANGED:
      return { ...state, users: action.payload };
    case ACTIONS.USER_STATUS_CHANGED:
      const users = state.users.map((user) => {
        if (user._id === action.payload._id) {
          user.online = action.payload.online;
        }
        return user;
      });
      return { ...state, users: users };
    case ACTIONS.LOAD_ROOM: {
      return {
        ...state,
        currentRoom: action.payload,
        users: action.payload.users,
        messages: action.payload.messages,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useRoomData() {
  const [state, dispatch] = React.useReducer(roomDataReducer, initialState);
  const { currentRoom, messages, users } = state;

  console.log('useRoomData state', state);

  return {
    currentRoom,
    users,
    messages,
    dispatch,
  };
}

export { ACTIONS, useRoomData };
