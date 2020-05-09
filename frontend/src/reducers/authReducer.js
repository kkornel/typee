import {
  SIGN_UP_WITH_EMAIL,
  SIGN_UP_WITH_EMAIL_ERROR,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_ERROR,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS,
  PASSWORD_RESET_REQUEST_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  token: null,
  user: null,
  message: null,
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
      return {
        message: null,
        error: null,
        ...action.payload,
      };
    case LOGIN_WITH_EMAIL_ERROR:
      return {
        isSignedIn: null,
        user: null,
        message: null,
        error: action.payload,
      };
    case PASSWORD_RESET_REQUEST:
      return {
        isSignedIn: null,
        user: null,
        message: action.payload,
        error: null,
      };
    case PASSWORD_RESET_REQUEST_SUCCESS:
      return {
        isSignedIn: null,
        user: null,
        message: action.payload,
        error: null,
      };
    case PASSWORD_RESET_REQUEST_FAILED:
      return {
        isSignedIn: null,
        user: null,
        message: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
