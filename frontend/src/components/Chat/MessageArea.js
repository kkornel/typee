import React from 'react';

import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Message from './Message';
import MessageShort from './MessageShort';
import MessageInput from './MessageInput';
import SystemMessage from './SystemMessage';
import HorizontalTextDivider from './HorizontalTextDivider';

export default function MessageArea({ messages, handleMessageSubmit }) {
  const classes = useStyles();

  const dateFormat = 'MMMM D, YYYY';

  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behaviour: 'smooth' });
  };

  const getMessage = (message, idx) => {
    if (idx !== 0 && message.author._id === messages[idx - 1].author._id) {
      return <MessageShort key={message._id} message={message} />;
    }
    return <Message key={message._id} message={message} />;
  };

  const getDate = (createdAt) => {
    return moment(createdAt).format(dateFormat);
  };

  const renderMessage = (message, currentIdx) => {
    let renderNewDateDivider =
      currentIdx == 0 ||
      !moment(message.createdAt).isSame(
        messages[currentIdx - 1].createdAt,
        'day'
      );

    if (message.systemMessage) {
      if (renderNewDateDivider) {
        return (
          <>
            <HorizontalTextDivider text={getDate(message.createdAt)} />
            <SystemMessage key={message._id} message={message} />
          </>
        );
      }
      return <SystemMessage key={message._id} message={message} />;
    }

    if (renderNewDateDivider) {
      return (
        <>
          <HorizontalTextDivider text={getDate(message.createdAt)} />
          <Message key={message._id} message={message} />
        </>
      );
    }
    return getMessage(message, currentIdx);
  };

  return (
    <Box className={classes.chatContent}>
      <Box className={classes.messagesWrapper}>
        <Box className={classes.scroller}>
          <Box className={classes.scrollerContent}>
            <Box className={classes.messagesList}>
              {messages.map((message, currentIdx) =>
                renderMessage(message, currentIdx)
              )}
              <Box ref={messagesEndRef} />
            </Box>
          </Box>
        </Box>
      </Box>
      <MessageInput handleMessageSubmit={handleMessageSubmit} />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  chatContent: {
    position: 'relative',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    minWidth: 0,
    minHeight: 0,
    paddingTop: '8px',
    outline: 0,
  },
  scroller: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingRight: 0,
    minHeight: 0,
    boxSizing: 'border-box',
    overflow: 'hidden scroll',
    overflowAnchor: 'none',
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.scrollbarThinThumb} ${theme.palette.scrollbarThinTrack}`,
  },
  scrollerContent: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'flex-end',
    alignItems: 'stretch',
    height: '100%',
    minHeight: '100px',
    overflowAnchor: 'none',
  },
  messagesWrapper: {
    display: 'flex',
    position: 'relative',
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0,
    zIndex: 0,
    outline: 0,
    height: '100vh',
  },
  messagesList: {
    outline: 0,
    minHeight: 0,
    backgroundColor: theme.palette.backgroundPrimary,
  },
}));
