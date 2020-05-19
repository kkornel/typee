import {
  REQUEST_ERROR,
  SIGN_UP_WITH_EMAIL,
  LOGIN_WITH_EMAIL,
  LOGOUT,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS,
  RESEND_VERIFICATION_EMAIL,
  RESET_MESSAGE_AND_ERROR,
  FETCH_USER,
} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: false,
  token: null,
  user: null,
  message: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_ERROR:
      return { ...INITIAL_STATE, ...action.payload };
    case SIGN_UP_WITH_EMAIL:
      return { ...INITIAL_STATE, ...action.payload };
    case FETCH_USER:
      return { ...INITIAL_STATE, ...action.payload, isSignedIn: true };
    case LOGIN_WITH_EMAIL:
      return { ...INITIAL_STATE, ...action.payload, isSignedIn: true };
    case LOGOUT:
      return { ...INITIAL_STATE, ...action.payload };
    case PASSWORD_RESET_REQUEST:
      return { ...INITIAL_STATE, ...action.payload };
    case PASSWORD_RESET_REQUEST_SUCCESS:
      return { ...INITIAL_STATE, ...action.payload };
    case RESEND_VERIFICATION_EMAIL:
      return { ...INITIAL_STATE, ...action.payload };
    case RESET_MESSAGE_AND_ERROR:
      return { ...state, message: null, error: null };
    default:
      return state;
  }
};
