import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const GoogleButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.signInGoogleButton),
    textTransform: 'none',
    backgroundColor: theme.palette.signInGoogleButton,
    '&:hover': {
      backgroundColor: theme.palette.signInGoogleButtonOnHover,
    },
  },
}))(Button);

export default GoogleButton;
