import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export default function BodyContainer(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Box className={classes.mainBox}>{props.children}</Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '32px',
    paddingBottom: '32px',
  },
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px 24px 16px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px 0 #000',
    color: theme.palette.textMuted,
    background: theme.palette.backgroundPrimary,
  },
}));
