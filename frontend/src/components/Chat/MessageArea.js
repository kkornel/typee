import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';

// TODO: Add unique key
export default function MessageArea({ messages }) {
  const classes = useStyles();
  const theme = mainTheme();

  const renderMessage = () => {
    return (
      <Box
        className={classNames(classes.messagesList, theme.backgroundPrimary)}
      >
        {messages.map((message) => {
          let username = '';
          let key = '';

          if (message.username) {
            username = 'Admin';
            key = uuidv4();
            console.log('key', key);
          } else {
            username = message.author.username;
            key = message._id;
          }
          return (
            <Box
              className={classNames(
                classes.messagesListItem,
                theme.backgroundPrimary
              )}
              // key={message._id}
              key={key}
            >
              <Avatar className={classes.messagesListItemAvatar}>
                {username[0]}
                {username[1]}
                {/* {message.authorId.username[0]}
              {message.authorId.username[1]} */}
              </Avatar>
              <Box>
                <Box className={classes.messagesListItemInfo}>
                  <Box
                    className={classNames(
                      classes.messagesListItemUsername,
                      theme.headerPrimary
                    )}
                  >
                    {/* {message.authorId.username} */}
                    {username}
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
  };

  return renderMessage();
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
