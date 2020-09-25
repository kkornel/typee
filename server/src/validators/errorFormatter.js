// Default:
// "errors": [
//   {
//     "value": "Abc",
//     "msg": "Invalid value.",
//     "param": "password",
//     "location": "body"
//   }
// ]

const errorFormatter = ({ location, msg, param, value }) => {
  return {
    value,
    message: msg,
  };
};

module.exports = errorFormatter;
