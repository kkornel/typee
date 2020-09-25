import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    headerPrimary: '#fff',
    headerSecondary: '#b9bbbe',
    appBarBackground: '#23272a',
    activityCardBackground: '#202225',
    editableCardBackground: '#303237',
    backgroundPrimary: '#36393f',
    backgroundSecondary: '#2f3136',
    backgroundSecondaryAlt: '#292b2f',
    backgroundTertiary: '#202225',
    backgroundAccent: '#4f545c',
    backgroundMessageInput: '#40444b',
    backgroundFloating: '#18191c',
    textNormal: '#dcddde',
    textMuted: '#72767d',
    textLink: '#00b0f4',
    interactiveNormal: '#b9bbbe',
    interactiveHover: '#dcddde',
    interactiveActive: '#fff',
    interactiveMuted: '#4f545c',
    itemOnHover: '#32353b',

    // Colors
    green: '#43b581',
    greenAlt: '#3ca374',
    red: '#f04747',
    redAlt: '#C7312F',
    redDark: '#423337',
    purple: '#7289da',
    purpleAlt: '#677bc4',
    purpleAlt2: '#8095dd',
    purpleAlt3: '#d8d8f7',
    blueLight: '#d9e8ff',
    blueDark: '#a4bcda',

    logoPrimary: '#fff',
    focusPrimary: '#00b0f4',
    channelsDefault: '#8e9297',
    textBoxMarkdownSyntax: '#8e9297',
    scrollbarThinThumb: '#202225',
    scrollbarThinTrack: 'transparent',
    textInputBackground: '#2b2d31',
    textInputBorder: '#1e1f22',
    border: '#202225',

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
