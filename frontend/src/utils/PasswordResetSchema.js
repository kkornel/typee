import * as yup from 'yup';

import passwordValidator from './passwordValidator';

const PasswordResetSchema = yup.object().shape({
  email: yup.string().required('Required.').email('Invalid email.'),
});

export default PasswordResetSchema;
