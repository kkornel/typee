import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function SystemMessage({ message }) {
  const classes = useStyles();
  const theme = mainTheme();

  return (
    <Box className={classNames(classes.systemMessage, theme.backgroundPrimary)}>
      {message.text}
    </Box>
  );
}

const mainTheme = makeStyles((theme) => ({
  headerPrimary: {
    color: '#fff',
  },
  textNormal: {
    color: '#dcddde',
  },
  textMuted: {
    color: '#72767d',
  },
  backgroundPrimary: {
    backgroundColor: '#36393f',
  },
}));

const useStyles = makeStyles((theme) => ({
  systemMessage: {
    // display: 'flex',
    // width: '100%',
    // maxWidth: '100%',
    padding: '5px 10px 5px 12px',
    fontFamily: 'Lucida Console',
    // fontFamily: 'Consolas',
    fontStyle: 'italic',
    fontSize: '11px',
    '&:hover': {
      background: '#32353b',
      // background: '#292b2f',
    },
  },
}));
