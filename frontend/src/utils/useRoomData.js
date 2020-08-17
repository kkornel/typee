import React from 'react';

const ACTIONS = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  LOAD_MESSAGES: 'LOAD_MESSAGES',
  SET_CURRENT_ROOM: 'SET_CURRENT_ROOM',
};

const initialState = {
  currentRoom: null,
  messages: [],
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
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useRoomData() {
  const [state, dispatch] = React.useReducer(roomDataReducer, initialState);
  const { currentRoom, messages } = state;

  return {
    currentRoom,
    messages,
    dispatch,
  };
}

export { ACTIONS, useRoomData };
