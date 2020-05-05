import axios from 'axios';

import { SIGN_UP_WITH_EMAIL } from './types';
import localhost from '../apis/localhost';

export const signUpWithEmail = (formValues) => async (dispatch) => {
  console.log(formValues);
  const response = await axios.post('/signup', formValues);
  console.log(response);
  dispatch({ type: SIGN_UP_WITH_EMAIL, payload: response.data });
};
