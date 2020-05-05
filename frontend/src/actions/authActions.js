import axios from 'axios';

import { SIGN_UP_WITH_EMAIL } from './types';

export const signUpWithEmail = (formValues) => async (dispatch) => {
  console.log(formValues);
  const response = await axios.post('/auth/signup', formValues);
  console.log(response);
  dispatch({ type: SIGN_UP_WITH_EMAIL, payload: response.data });
};
