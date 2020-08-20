import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

export default function Message({ message }) {
  const classes = useStyles();
  // const theme = mainTheme();

  return (
    <Box className={classes.messagesListItem}>
      <Avatar className={classes.messagesListItemAvatar}>
        {message.author.username[0]}
        {message.author.username[1]}
      </Avatar>
      <Box>
        <Box className={classes.messagesListItemInfo}>
          <Box className={classes.messagesListItemUsername}>
            {message.author.username}
          </Box>
          <Box className={classes.messagesListItemDate}>
            {message.createdAt}
          </Box>
        </Box>
        <Box className={classes.flexDivider}></Box>
        <Box className={classes.messagesListItemContent}>{message.text}</Box>
      </Box>
    </Box>
  );
}

// const mainTheme = makeStyles((theme) => ({
//   headerPrimary: {
//     // color: '#fff',
//   },
//   textNormal: {
//     color: '#dcddde',
//   },
//   textMuted: {
//     // color: '#72767d',
//   },
//   backgroundPrimary: {
//     backgroundColor: '#36393f',
//   },
// }));

const useStyles = makeStyles((theme) => ({
  flexDivider: {
    width: '100%',
  },
  messagesListItem: {
    background: theme.palette.backgroundDark,
    display: 'flex',
    // flexWrap: 'wrap',
    maxWidth: '100%',
    // background: '#36393f',
    padding: '10px',
    '&:hover': {
      background: theme.palette.messageOnHover,
      // background: '#292b2f',
    },
  },
  messagesListItemAvatar: {
    marginRight: '10px',
  },
  messagesListItemInfo: {
    display: 'flex',
    alignItems: 'baseline',
    width: '100%',
  },
  messagesListItemUsername: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '5px',
    color: theme.palette.white,
  },
  messagesListItemDate: {
    fontSize: '12px',
    color: theme.palette.textMuted,
  },
  messagesListItemContent: {
    color: theme.palette.textNormal,
  },
}));
