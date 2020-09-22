import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export default function DevLog(props) {
  const classes = useStyles();

  React.useEffect(() => {
    document.title = 'About | dev log';
  }, []);

  return (
    <Box className={classes.body}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.box}>DEV LOGGY</Box>
      </Container>
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
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
