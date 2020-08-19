import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import SystemMessage from './SystemMessage';
import Message from './Message';

export default function MessageArea({ messages }) {
  const classes = useStyles();
  const theme = mainTheme();

  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behaviour: 'smooth' });
  };

  return (
    <Box className={classNames(classes.messagesList, theme.backgroundPrimary)}>
      {messages.map((message) => {
        return message.systemMessage ? (
          <SystemMessage key={message._id} message={message} />
        ) : (
          <Message key={message._id} message={message} />
        );
      })}
      <Box ref={messagesEndRef} />
    </Box>
  );
}

const mainTheme = makeStyles((theme) => ({
  backgroundPrimary: {
    backgroundColor: '#36393f',
  },
}));

const useStyles = makeStyles((theme) => ({
  messagesList: {
    // background: 'white',
    // background: '#36393f',
    // maxHeight: '1000px',
    height: '100%',
    overflowY: 'scroll',
    // alignItems: 'stretch',
  },
}));
