import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import ArrowTooltip from '../../ui/ArrowTooltip';

import { processMessage } from '../../../utils/messageUtils';
import { longDateFormat, processDate } from '../../../utils/dateUtils';

export default function Message({ message, onUserClick }) {
  const classes = useStyles();

  return (
    <Box className={classes.messagesListItem}>
      <IconButton
        className={classes.messagesListUserIconButton}
        onClick={() => onUserClick(message.author)}
      >
        {message.author.avatarUrl ? (
          <Avatar
            className={classes.messagesListItemAvatar}
            src={message.author.avatarUrl}
            alt={`It is supposed to show user avatar, but it doesn't!`}
          />
        ) : (
          <Avatar className={classes.messagesListItemAvatar}>
            {message.author.username[0]}
            {message.author.username[1]}
          </Avatar>
        )}
      </IconButton>
      <Box>
        <Box className={classes.messagesListItemInfo}>
          <Box
            className={classes.messagesListItemUsername}
            onClick={() => onUserClick(message.author)}
          >
            {message.author.username}
          </Box>
          <ArrowTooltip
            title={moment(message.createdAt).format(longDateFormat)}
            small="true"
            placement="top"
          >
            <Box className={classes.messagesListItemDate}>
              {processDate(message.createdAt)}
            </Box>
          </ArrowTooltip>
        </Box>
        <Box className={classes.flexDivider}></Box>
        <Box className={classes.messagesListItemContent}>
          {processMessage(message.text)}
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  flexDivider: {
    width: '100%',
  },
  messagesListItem: {
    position: 'relative',
    display: 'flex',
    marginTop: '16px',
    paddingTop: '2px',
    paddingRight: '48px',
    paddingBottom: '2px',
    minHeight: '44px',
    minWidth: '0px',
    maxWidth: '100%',
    wordWrap: 'break-word',
    background: theme.palette.backgroundPrimary,
    '&:hover': {
      background: theme.palette.itemOnHover,
    },
  },
  messagesListItemAvatar: {
    marginRight: '16px',
    marginLeft: '16px',
  },
  messagesListUserIconButton: {
    padding: 0,
    width: '40px',
    height: '40px',
    marginRight: '16px',
    marginLeft: '16px',
    marginTop: '4px',
  },
  messagesListItemInfo: {
    display: 'flex',
    width: '100%',
    lineHeight: '22px',
    minHeight: '22px',
    alignItems: 'baseline',
    whiteSpace: 'break-spaces',
  },
  messagesListItemUsername: {
    color: theme.palette.headerPrimary,
    marginRight: '4px',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '22px',
    verticalAlign: 'baseline',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  messagesListItemDate: {
    marginLeft: '4px',
    height: '20px',
    lineHeight: '22px',
    fontSize: '12px',
    fontWeight: 500,
    verticalAlign: 'baseline',
    fontFamily: 'Roboto',
    color: theme.palette.textMuted,
  },
  messagesListItemContent: {
    display: 'table',
    tableLayout: 'fixed',
    width: '100%',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'break-spaces',
    color: theme.palette.textNormal,
  },
}));
