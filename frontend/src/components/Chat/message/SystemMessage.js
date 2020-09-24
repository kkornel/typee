import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { timeFormat } from '../../../utils/dateUtils';

export default function SystemMessage({ message }) {
  const classes = useStyles();

  // TODO: extract to be reusable
  const changeColor = (event) => {
    const timeSpan = document.getElementById(message._id);

    if (event.type === 'mouseenter') {
      timeSpan.style.color = '#72767d';
    } else if (event.type === 'mouseleave') {
      timeSpan.style.color = '#36393f';
    }
  };

  const processDate = (createdAt) => {
    return moment(createdAt).format(timeFormat);
  };

  return (
    <Box
      className={classes.systemMessage}
      onMouseEnter={changeColor}
      onMouseLeave={changeColor}
    >
      <Box className={classes.systemMessageContent}>{message.text}</Box>
      <Box className={classes.systemMessageTime} id={message._id}>
        {processDate(message.createdAt)}
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
