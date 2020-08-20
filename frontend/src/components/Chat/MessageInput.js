import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import GifIcon from '@material-ui/icons/Gif';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';

export default function MessageInput({ handleMessageSubmit }) {
  const classes = useStyles();
  // const theme = mainTheme();

  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) {
      return;
    }

    handleMessageSubmit(inputValue);
    setInputValue('');
  };

  return (
    <Box className={classes.messagesCompose}>
      <Box className={classes.messagesComposeForm}>
        <Paper
          component="form"
          className={classes.root}
          onSubmit={handleSubmit}
        >
          <IconButton
            // className={classNames(classes.iconButton, theme.interactiveNormal)}
            className={classes.iconButton}
            aria-label="menu"
          >
            <AddCircleIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            // multiline
            // rowsMax="3"
            placeholder="Message #CHANNEL_NAME"
            inputProps={{
              'aria-label': 'Message #CHANNEL_NAME',
            }}
          />
          <IconButton className={classes.iconButton} aria-label="search">
            <GifIcon />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="search">
            <EmojiEmotionsIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            type="submit"
            color="primary"
            className={classes.iconButton}
            aria-label="directions"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}

// const mainTheme = makeStyles((theme) => ({
//   textNormal: {
//     color: '#dcddde',
//   },
//   interactiveNormal: {
//     color: '#b9bbbe',
//     '&:hover': {
//       color: '#dcddde',
//     },
//   },
//   backgroundPrimary: {
//     backgroundColor: '#36393f',
//   },
//   backgroundSecondary: {
//     backgroundColor: '#2f3136',
//   },
// }));

const useStyles = makeStyles((theme) => ({
  messagesCompose: {
    display: 'flex',
    // background: 'blue',
    // background: '#36393f',
    // position: 'absolute',
    // bottom: 0,
    background: theme.palette.backgroundDark,
    width: '100%',
    // marginLeft: '100px',
    alignSelf: 'flex-end',

    // flexGrow: 1,
    // zIndex: '-1',
  },
  messagesComposeForm: {
    padding: '8px 16px 8px 8px',
    width: '100%',
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    background: theme.palette.backgroundMessageInput,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: theme.palette.textNormal,
  },
  iconButton: {
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.interactiveNormalOnHover,
    },
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
    background: theme.palette.backgroundMiddle,
  },
}));
