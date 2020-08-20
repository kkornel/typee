import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import SystemMessage from './SystemMessage';
import Message from './Message';

export default function MessageArea({ messages }) {
  const classes = useStyles();

  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behaviour: 'smooth' });
  };

  return (
    <Box className={classes.messagesList}>
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

const useStyles = makeStyles((theme) => ({
  messagesList: {
    backgroundColor: theme.palette.backgroundDark,
    height: '100%',
    overflowY: 'scroll',
  },
}));
