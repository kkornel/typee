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

export default function ({ handleMessageSubmit }) {
  const classes = useStyles();
  const theme = mainTheme();

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
    <Box
      className={classNames(classes.messagesCompose, theme.backgroundPrimary)}
    >
      <Box className={classes.messagesComposeForm}>
        <Paper
          component="form"
          className={classes.root}
          onSubmit={handleSubmit}
        >
          <IconButton
            className={classNames(classes.iconButton, theme.interactiveNormal)}
            aria-label="menu"
          >
            <AddCircleIcon />
          </IconButton>
          <InputBase
            className={classNames(classes.input, theme.textNormal)}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            // multiline
            // rowsMax="3"
            placeholder="Message #CHANNEL_NAME"
            inputProps={{
              'aria-label': 'Message #CHANNEL_NAME',
            }}
          />
          <IconButton
            className={classNames(classes.iconButton, theme.interactiveNormal)}
            aria-label="search"
          >
            <GifIcon />
          </IconButton>
          <IconButton
            className={classNames(classes.iconButton, theme.interactiveNormal)}
            aria-label="search"
          >
            <EmojiEmotionsIcon />
          </IconButton>
          <Divider
            className={classNames(classes.divider, theme.backgroundSecondary)}
            orientation="vertical"
          />
          <IconButton
            type="submit"
            color="primary"
            className={classNames(classes.iconButton, theme.interactiveNormal)}
            aria-label="directions"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}

const mainTheme = makeStyles((theme) => ({
  textNormal: {
    color: '#dcddde',
  },
  interactiveNormal: {
    color: '#b9bbbe',
    '&:hover': {
      color: '#dcddde',
    },
  },
  backgroundPrimary: {
    backgroundColor: '#36393f',
  },
  backgroundSecondary: {
    backgroundColor: '#2f3136',
  },
}));

const useStyles = makeStyles((theme) => ({
  messagesCompose: {
    display: 'flex',
    // background: 'blue',
    // background: '#36393f',
    // position: 'absolute',
    // bottom: 0,
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
    background: '#40444b',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
