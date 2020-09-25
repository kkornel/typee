import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { timeFormat } from '../../../utils/dateUtils';
import { processMessage } from '../../../utils/messageUtils';

export default function ShortMessage({ message }) {
  const classes = useStyles();

  // TODO: Extract to be reusable
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
      className={classes.messagesListItem}
      onMouseEnter={changeColor}
      onMouseLeave={changeColor}
    >
      <Box className={classes.messageTimeSpan} id={message._id.toString()}>
        {processDate(message.createdAt)}
      </Box>
      <Box className={classes.messagesListItemContent}>
        {processMessage(message.text)}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  messagesListItem: {
    position: 'relative',
    display: 'flex',
    paddingLeft: '72px',
    paddingRight: '48px',
    paddingTop: '2px',
    paddingBottom: '2px',
    minHeight: '22px',
    minWidth: '0px',
    maxWidth: '100%',
    wordWrap: 'break-word',
    background: theme.palette.backgroundPrimary,
    '&:hover': {
      background: theme.palette.itemOnHover,
    },
  },
  messageTimeSpan: {
    position: 'absolute',
    left: 0,
    height: '22px',
    lineHeight: '22px',
    width: '56px',
    textAlign: 'right',
    fontSize: '11px',
    marginRight: '4px',
    fontWeight: 500,
    fontFamily: 'Roboto',
    color: theme.palette.backgroundPrimary,
  },
  messagesListItemContent: {
    display: 'table',
    tableLayout: 'fixed',
    width: '100%',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'break-spaces',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    color: theme.palette.textNormal,
  },
}));
