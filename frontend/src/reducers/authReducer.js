import { SIGN_UP_WITH_EMAIL } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SIGN_UP_WITH_EMAIL:
      console.log(state, action);
      return state;
    default:
      return state;
  }
};
