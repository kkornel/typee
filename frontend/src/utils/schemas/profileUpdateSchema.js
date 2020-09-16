import * as yup from 'yup';

import passwordValidator from '../passwordValidator';

const profileUpdateSchema = yup.object().shape({
  email: yup
    .string()
    .required('This field is required')
    .email('Invalid email.'),
  username: yup
    .string()
    .required('This field is required')
    .min(4, 'Min length is 4.')
    .max(18, 'Max length is 18.'),
  password: yup.string().required('This field is required'),
  newPassword: yup
    .string()
    .test(
      'password-strength',
      'Must contain at least  8 Characters, 1 Uppercase, 1 Lowercase and 1 Number.',
      function (value) {
        return !value || passwordValidator.validate(value);
      }
    ),
  newPasswordConfirmation: yup
    .string()
    .test('passwords-match', "Passwords don't match.", function (value) {
      return this.parent.newPassword === value;
    }),
});

export default profileUpdateSchema;
