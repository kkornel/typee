import React from 'react';
import classNames from 'classnames';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import RoundedButton from '../ui/buttons/RoundedButton';
import RoundedLinkButton from '../ui/buttons/RoundedLinkButton';

import '../../css/wave.css';

export default function About(props) {
  const classes = useStyles();

  React.useEffect(() => {
    document.title = 'About | typee';
  }, []);

  return (
    <Box className={classes.body}>
      <Box className={classes.boxRow}>
        <Container maxWidth="lg" className={classes.container}>
          <Box className={classes.imageBox}>
            <img
              className={classes.image}
              src="https://i.imgur.com/r7PiYmK.gif"
              alt="It is supposed to show very important gif, but it doesn't :("
            />
          </Box>
          <Box className={classes.textBox}>
            <Box className={classes.textHeader}>
              Chat, study, collaborate or goof around
            </Box>
            <Box className={classes.textContent}>
              <p>
                Type with others about your day, talk with your work colleagues,
                do homework with schoolmates or just invite friends to play
                together.
              </p>
              <p>No matter what, typee is there for you.</p>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box id="A"></Box>
      <Box id="B"></Box>

      <Box className={classes.boxRow}>
        <Container maxWidth="lg" className={classes.container}>
          <Box className={classNames(classes.textBox, classes.textBoxRow2)}>
            <Box className={classes.textHeader}>
              A better way to communicate
            </Box>
            <Box className={classes.textContent}>
              Conversations in typee are easy to follow. And they’re more than
              conversations — you can create your own rooms, make friends, send
              gifs and more!
            </Box>
          </Box>

          <Box className={classes.imageBox}>
            <img
              className={classes.image}
              src="https://i.imgur.com/ZnGXeMD.gif"
              alt="It is supposed to show very important gif, but it doesn't :("
            />
          </Box>
        </Container>
      </Box>

      <Box id="C"></Box>
      <Box id="D"></Box>

      <Box className={classes.boxRow}>
        <Container maxWidth="lg" className={classes.container}>
          <Box className={classes.imageBox}>
            <img
              className={classes.image}
              src="https://i.imgur.com/IICTl62.gif"
              alt="It is supposed to show very important gif, but it doesn't :("
            />
          </Box>
          <Box className={classes.textBox}>
            <Box className={classes.textHeader}>
              Start your journey right now
            </Box>
            <Box className={classes.textContent}>And join us!</Box>
          </Box>
        </Container>
      </Box>

      <Box className={classes.signUp}>
        <RoundedLinkButton to={'/sign-up'} cls={classes.buttonDark}>
          SIGN UP
        </RoundedLinkButton>
      </Box>

      <Box id="C"></Box>
      <Box id="D">
        <a
          href="https://github.com/kkornel/typee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RoundedButton cls={classes.buttonWhite}>
            <FontAwesomeIcon icon={faGithub} />
            <Box className={classes.githubBox}>Github</Box>
          </RoundedButton>
        </a>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  body: {
    background: 'white',
    // overflowX: 'hidden',
    overflow: 'hidden auto',
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.scrollbarThinThumb} ${theme.palette.scrollbarThinTrack}`,
    height: 'calc(100vh - 48px)',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch',
  },
  boxRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.palette.appBarBackground,
    maxWidth: '50%',
  },
  textHeader: {
    fontSize: '48px',
    fontWeight: 700,
  },
  textContent: {
    marginTop: '24px',
    fontSize: '20px',
    lineHeight: '32px',
  },
  textBoxRow2: {
    maxWidth: '50%',
    height: '423px',
    background: theme.palette.purpleAlt3,
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
    borderBottom: '1px solid #f6f6f6',
    paddingLeft: '20px',
  },
  image: {
    height: '440px',
    maxWidth: '100%',
  },
  buttonWhite: {
    background: 'white',
    color: theme.palette.appBarBackground,
    '&:hover': {
      color: theme.palette.purple,
      boxShadow: `0 2px 15px ${theme.palette.purple}`,
    },
  },
  buttonDark: {
    color: 'white',
    background: theme.palette.appBarBackground,
    '&:hover': {
      background: theme.palette.backgroundPrimary,
      boxShadow: '0 2px 15px white',
    },
  },
  signUp: {
    display: 'flex',
    justifyContent: 'center',
  },
  githubBox: {
    marginLeft: '8px',
  },
}));

// Another approach
// const useStyles = makeStyles((theme) => ({
//   body: {
//     background: 'white',
//     overflowX: 'hidden',
//     height: 'calc(100vh - 48px)',
//   },
//   container: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'stretch',
//     flexWrap: 'wrap',
//   },
//   boxRow: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textBox: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     color: theme.palette.appBarBackground,
//     maxWidth: '50%',
//     // flexBasis: '5%',
//   },
//   textHeader: {
//     fontSize: '48px',
//     fontWeight: 700,
//   },
//   textContent: {
//     marginTop: '24px',
//     fontSize: '20px',
//     lineHeight: '32px',
//   },
//   textBoxRow2: {
//     // maxWidth: '100%',
//     maxWidth: '50%',
//     height: '423px',
//     background: theme.palette.purpleAlt3,
//     borderTopLeftRadius: '30px',
//     borderBottomLeftRadius: '30px',
//     borderBottom: '1px solid #f6f6f6',
//     paddingLeft: '20px',
//   },
//   image: {
//     // width: '650px',
//     height: '440px',
//   },
//   buttonWhite: {
//     background: 'white',
//     color: theme.palette.appBarBackground,
//     '&:hover': {
//       color: theme.palette.purple,
//       boxShadow: `0 2px 15px ${theme.palette.purple}`,
//     },
//   },
//   buttonDark: {
//     color: 'white',
//     background: theme.palette.appBarBackground,
//     '&:hover': {
//       background: theme.palette.backgroundPrimary,
//       boxShadow: '0 2px 15px white',
//     },
//   },
//   signUp: {
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   githubBox: {
//     marginLeft: '8px',
//   },
// }));
