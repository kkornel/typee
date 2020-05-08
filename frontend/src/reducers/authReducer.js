import {
  SIGN_UP_WITH_EMAIL,
  SIGN_UP_WITH_EMAIL_ERROR,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_WITH_EMAIL:
      // TODO:
      return { ...action.payload, error: null };
    case SIGN_UP_WITH_EMAIL_ERROR:
      return { isSignedIn: null, userId: null, error: action.payload };
    case LOGIN_WITH_EMAIL:
      // TODO:
      return { ...action.payload, error: null };
    case LOGIN_WITH_EMAIL_ERROR:
      return { isSignedIn: null, userId: null, error: action.payload };
    default:
      return state;
  }
};
