import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import RoundedLinkButton from '../ui/buttons/RoundedLinkButton';

import '../../css/wave.css';

export default function FourOhFour() {
  const classes = useStyles();

  return (
    <Box className={classes.body}>
      <Box className={classes.boxRow}>
        <Container maxWidth="lg" className={classes.container}>
          <Box className={classes.textBox}>
            <Box className={classes.textHeader}>Ooops!</Box>
            <Box className={classes.textContent}>
              Seems like you've got lost!
            </Box>
            <Box className={classes.returnButton}>
              <RoundedLinkButton to={'/'} cls={classes.buttonDark}>
                Return safely with us
              </RoundedLinkButton>
            </Box>
          </Box>
          <Box className={classes.imageBox}>
            <img
              className={classes.image}
              src="https://i.imgur.com/3q1DdMA.png"
              alt="It is supposed to show very important data, but it doesn't :("
            />
          </Box>
        </Container>
      </Box>

      <Box id="A"></Box>
      <Box id="B"></Box>
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
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.appBarBackground,
    width: '100%',
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
  returnButton: {
    marginTop: '48px',
  },
  image: {
    height: '100%',
  },
  buttonDark: {
    color: 'white',
    background: theme.palette.appBarBackground,
    '&:hover': {
      background: theme.palette.backgroundPrimary,
      boxShadow: '0 2px 15px white',
    },
  },
}));
