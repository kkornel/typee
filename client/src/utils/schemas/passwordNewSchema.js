import * as yup from 'yup';

import passwordValidator from '../passwordValidator';

const passwordNewSchema = yup.object().shape({
  password: yup
    .string()
    .required('This field is required')
    .test(
      'password-strength',
      'Must contain at least  8 Characters, 1 Uppercase, 1 Lowercase and 1 Number',
      function (value) {
        return passwordValidator.validate(value);
      }
    ),
  passwordConfirmation: yup
    .string()
    .required('This field is required')
    .test('passwords-match', "Passwords don't match", function (value) {
      return this.parent.password === value;
    }),
});

export default passwordNewSchema;
