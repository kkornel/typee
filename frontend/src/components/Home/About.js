import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import RoundedLinkButton from '../ui/buttons/RoundedLinkButton';

import '../../wave.css';

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
              alt="It is supposed to show very important image, but it doesn't :("
            />
          </Box>
          <Box className={classes.textBox}>
            <Box className={classes.textHeader}>Where hanging out is easy</Box>
            <Box className={classes.textContent}>
              Grab a seat in a voice channel when you’re free. Friends in your
              server can see you’re around and instantly pop in to talk without
              having to call.
            </Box>
          </Box>
        </Container>
      </Box>

      <Box id="A"></Box>
      <Box id="B" class="wavy"></Box>

      <Box className={classes.boxRow}>
        <Container maxWidth="lg" className={classes.container}>
          <Box className={classNames(classes.textBox, classes.textBoxRow2)}>
            <Box className={classes.textHeader}>From a few to a fandom</Box>
            <Box className={classes.textContent}>
              Get a community of any size running with moderation tools and
              custom member access. Give members special powers, set up private
              channels, and more.
            </Box>
          </Box>

          <Box className={classes.imageBox}>
            <img
              className={classes.image}
              src="https://i.imgur.com/ZnGXeMD.gif"
              alt="It is supposed to show very important image, but it doesn't :("
            />
          </Box>
        </Container>
      </Box>

      <Box id="C"></Box>
      <Box id="D" class="wavy">
        <RoundedLinkButton to={'/dev-log'} classes={classes.buttonWhite}>
          DEV LOG
        </RoundedLinkButton>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  body: {
    background: 'white',
    overflowX: 'hidden',
    height: 'calc(100vh - 48px)',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: '100%',
    height: '423px',
    background: theme.palette.purpleAlt3,
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
    borderBottom: '1px solid #f6f6f6',
    paddingLeft: '20px',
  },
  image: {
    // width: '650px',
    height: '440px',
  },
  buttonWhite: {
    background: 'white',
    color: theme.palette.appBarBackground,
    '&:hover': {
      color: theme.palette.purple,
      boxShadow: `0 2px 15px ${theme.palette.purple}`,
    },
  },
}));
