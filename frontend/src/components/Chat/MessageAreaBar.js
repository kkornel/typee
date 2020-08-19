import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function MessageAreaBar({ text }) {
  const classes = useStyles();
  const theme = mainTheme();

  return (
    <Box className={classNames(classes.messagesBar, theme.backgroundPrimary)}>
      {text}
    </Box>
  );
}

const mainTheme = makeStyles((theme) => ({
  backgroundPrimary: {
    backgroundColor: '#36393f',
  },
}));

const useStyles = makeStyles((theme) => ({
  messagesBar: {
    borderBottom: '1px solid #202225',
  },
}));
