import * as yup from 'yup';

import passwordValidator from './passwordValidator';

const SignInSchema = yup.object().shape({
  email: yup.string().required('Required.').email('Invalid email.'),
  password: yup.string().required('Required.'),
});

export default SignInSchema;
