import * as yup from 'yup';

import passwordValidator from '../passwordValidator';

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .required('This field is required')
    .email('Invalid email.'),
  username: yup
    .string()
    .required('This field is required')
    .min(4, 'Min length is 4.')
    .max(18, 'Max length is 18.'),
  password: yup
    .string()
    .required('This field is required')
    .test(
      'password-strength',
      'Must contain at least  8 Characters, 1 Uppercase, 1 Lowercase and 1 Number.',
      function (value) {
        return passwordValidator.validate(value);
      }
    ),
  passwordConfirmation: yup
    .string()
    .required('This field is required')
    .test('passwords-match', "Passwords don't match.", function (value) {
      return this.parent.password === value;
    }),
});

export default signUpSchema;
