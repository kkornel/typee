import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

// TODO: Add unique key
export default function ({ messages }) {
  const classes = useStyles();
  const theme = mainTheme();

  return (
    <Box className={classNames(classes.messagesList, theme.backgroundPrimary)}>
      {messages.map((message) => {
        return (
          <Box
            className={classNames(
              classes.messagesListItem,
              theme.backgroundPrimary
            )}
            key={message.username}
          >
            <Avatar className={classes.messagesListItemAvatar}>
              {message.username[0]}
              {message.username[1]}
            </Avatar>
            <Box>
              <Box className={classes.messagesListItemInfo}>
                <Box
                  className={classNames(
                    classes.messagesListItemUsername,
                    theme.headerPrimary
                  )}
                >
                  {message.username}
                </Box>
                <Box
                  className={classNames(
                    classes.messagesListItemDate,
                    theme.textMuted
                  )}
                >
                  {message.createdAt}
                </Box>
              </Box>
              <Box className={classes.flexDivider}></Box>
              <Box
                className={classNames(
                  classes.messagesListItemContent,
                  theme.textNormal
                )}
              >
                {message.text}
              </Box>
            </Box>
          </Box>
        );
      })}
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
  flexDivider: {
    width: '100%',
  },
  messagesList: {
    // background: 'white',
    // background: '#36393f',
    // maxHeight: '1000px',
    height: '100%',
    overflowY: 'scroll',
    // alignItems: 'stretch',
  },
  messagesListItem: {
    display: 'flex',
    // flexWrap: 'wrap',
    maxWidth: '100%',
    // background: '#36393f',
    padding: '10px',
    '&:hover': {
      background: '#32353b',
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
  },
  messagesListItemDate: {
    fontSize: '12px',
  },
  messagesListItemContent: {},
}));
