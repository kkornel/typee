import React from 'react';

import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function SystemMessage({ message }) {
  const classes = useStyles();

  const timeFormat = 'h:mm A';

  const changeColor = (event) => {
    const timeSpan = document.getElementById(message._id);
    if (event.type === 'mouseenter') {
      timeSpan.style.color = '#72767d';
    } else if (event.type === 'mouseleave') {
      timeSpan.style.color = '#36393f';
    }
  };

  return (
    <Box
      className={classes.systemMessage}
      onMouseEnter={changeColor}
      onMouseLeave={changeColor}
    >
      <Box className={classes.systemMessageContent}>{message.text}</Box>
      <Box className={classes.systemMessageTime} id={message._id}>
        {moment(message.createdAt).format(timeFormat)}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  systemMessage: {
    position: 'relative',
    display: 'flex',
    minHeight: '22px',
    minWidth: '0px',
    maxWidth: '100%',
    wordWrap: 'break-word',
    background: theme.palette.backgroundPrimary,
    '&:hover': {
      background: theme.palette.itemOnHover,
    },
  },
  systemMessageTime: {
    padding: '4px 8px 5px 0',
    width: '56px',
    height: '22px',
    lineHeight: '22px',
    textAlign: 'right',
    fontSize: '11px',
    fontWeight: 500,
    fontFamily: 'Roboto',
    color: theme.palette.backgroundPrimary,
  },
  systemMessageContent: {
    padding: '5px 0px 5px 12px',
    height: '22px',
    lineHeight: '22px',
    fontSize: '11px',
    fontStyle: 'italic',
    fontWeight: 400,
    fontFamily: 'Lucida Console',
    color: theme.palette.textNormal,
  },
}));

// const useStyles = makeStyles((theme) => ({
//   systemMessage: {
//     backgroundColor: theme.palette.backgroundPrimary,
//     padding: '5px 10px 5px 12px',
//     fontFamily: 'Lucida Console',
//     fontStyle: 'italic',
//     fontSize: '11px',
//     '&:hover': {
//       background: theme.palette.itemOnHover,
//     },
//   },
// }));
// return <Box className={classes.systemMessage}>{message.text}</Box>;
