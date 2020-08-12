import * as yup from 'yup';

import passwordValidator from './passwordValidator';

const PasswordNewSchema = yup.object().shape({
  password: yup
    .string()
    .required('Required.')
    .test(
      'password-strength',
      'Must contain at least  8 Characters, 1 Uppercase, 1 Lowercase and 1 Number.',
      function (value) {
        return passwordValidator.validate(value);
      }
    ),
  passwordConfirmation: yup
    .string()
    .required('Required.')
    .test('passwords-match', "Passwords don't match.", function (value) {
      return this.parent.password === value;
    }),
});

export default PasswordNewSchema;
