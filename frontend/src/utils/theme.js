import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // primary: { 500: '#00ff00' },
    appBarBackground: '#4527a0',
    backgroundDark: '#36393f',
    backgroundMiddle: '#2f3136', // secondary
    backgroundLight: '#202225', // tertiary
    backgroundMessageInput: '#40444b',
    textNormal: '#dcddde',
    textMuted: '#72767d',
    interactiveNormal: '#b9bbbe',
    interactiveNormalOnHover: '#dcddde',
    interactiveNormalButtonOnHover: '#4f545c',
    usersListItemOnHover: '#32353b',
    messageOnHover: '#32353b',
    usersListItemSubTitle: '#888',
    textDividerBorderBottom: '#202225',
    roomIconAvatarOnHover: '#7289da',
    green: '#43b581',
    menuBorder: '#d3d4d5',
    menuItemBackgroundOnFocus: '#32353b',
    messageBarBorderBottom: '#202225',
    white: '#fff',
    formInputBorder: '#7289da',

    // AUTH
    signInOR: '#616161',
    signUpText: '#424242',
    signUpLink: '#3f50b5',
    signInForgotLink: '#757575',
    signInResendLink: '#3f50b5',
    signInDivider: '#9e9e9e',
    signInGoogleButton: '#DB4437',
    signInGoogleButtonOnHover: '#c42d1f',
    recaptchaError: '#FF0000',
  },
});

export default theme;
