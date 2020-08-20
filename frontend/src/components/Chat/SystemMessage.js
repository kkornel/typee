import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function SystemMessage({ message }) {
  const classes = useStyles();

  return <Box className={classes.systemMessage}>{message.text}</Box>;
}

const useStyles = makeStyles((theme) => ({
  systemMessage: {
    backgroundColor: theme.palette.backgroundDark,
    padding: '5px 10px 5px 12px',
    fontFamily: 'Lucida Console',
    fontStyle: 'italic',
    fontSize: '11px',
    '&:hover': {
      background: theme.palette.messageOnHover,
    },
  },
}));
