import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const DarkTextField = withStyles((theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      color: theme.palette.interactiveNormal,
    },
    '& label.Mui-focused': {
      color: theme.palette.purple,
    },
    '& .MuiInput-underline': {
      // borderBottomColor: theme.palette.purple,
    },
    '& .MuiFilledInput-underline:before': {
      // borderBottomColor: theme.palette.purple,
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: theme.palette.purple,
    },
    '& .MuiFilledInput-root': {
      background: theme.palette.textInputBackground,
      borderTop: `1px solid ${theme.palette.textInputBorder}`,
      borderLeft: `1px solid ${theme.palette.textInputBorder}`,
      borderRight: `1px solid ${theme.palette.textInputBorder}`,
    },
  },
}))(TextField);

export default DarkTextField;
