import { SIGN_UP_WITH_EMAIL, SIGN_UP_WITH_EMAIL_ERROR } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_WITH_EMAIL:
      console.log(state, action);
      // TODO:
      return { ...state, error: null };
    case SIGN_UP_WITH_EMAIL_ERROR:
      return { isSignedIn: null, userId: null, error: action.payload };
    default:
      return state;
  }
};
