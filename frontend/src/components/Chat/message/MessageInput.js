import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import Picker from 'react-giphy-picker';
import { Picker as EmojiPicker } from 'emoji-mart';

import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import GifIcon from '@material-ui/icons/Gif';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';

import { useRoomData } from '../../../context/RoomDataContext';
import WorkInProgressDialog from '../../ui/dialogs/WorkInProgressDialog';

export default function MessageInput({ handleMessageSubmit }) {
  const classes = useStyles();

  const [roomDataState] = useRoomData();
  const inputPlaceHolder = `Message #${roomDataState.currentRoom.name}`;

  const inputRef = React.useRef(null);
  const [inputValue, setInputValue] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [showEmojiPicker, setShowEmojisPicker] = React.useState(false);
  const [showGiphyPicker, setShowGiphyPicker] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener('keydown', onEnterClicked, false);

    return () => {
      document.removeEventListener('keydown', onEnterClicked, false);
    };
  }, [inputValue]);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!inputValue) {
      return;
    }

    handleMessageSubmit(inputValue);
    setInputValue('');
  };

  const onEnterClicked = (event) => {
    if (!showEmojiPicker) {
      return;
    }

    if (event.keyCode === 13) {
      setShowEmojisPicker(false);
      handleSubmit();
      focusInput();
    }
  };

  const onChangeHandler = (event) => {
    setText(`${event.target.files[0].name}`);
    setOpen(true);
  };

  const onDialogClose = () => {
    setText('');
    setOpen(false);
  };

  const addEmoji = (event) => {
    const emoji = event.native;
    setInputValue(inputValue + emoji);
  };

  const showEmojis = () => {
    if (showGiphyPicker) {
      setShowGiphyPicker(false);
    }
    setShowEmojisPicker(!showEmojiPicker);
  };

  const addGif = (ev) => {
    // const prev_url = ev.preview_gif.url;
    const downsized_url = ev.downsized.url;
    const gif = `<gif>${downsized_url}</gif>`;
    handleMessageSubmit(gif);
    setShowGiphyPicker(false);
    focusInput();
  };

  const showGiphy = () => {
    if (showEmojiPicker) {
      setShowEmojisPicker(false);
    }
    setShowGiphyPicker(!showGiphyPicker);
  };

  const focusInput = () => {
    inputRef.current.children[0].focus();
  };

  return (
    <Box className={classes.messagesCompose}>
      <Box className={classes.messagesComposeForm}>
        <Paper
          className={classes.root}
          onSubmit={handleSubmit}
          component="form"
        >
          <IconButton className={classes.iconButton}>
            <div className={classes.customFileInputBox}>
              <AddCircleIcon />
              <input
                className={classes.customFileInput}
                type="file"
                onChange={onChangeHandler}
              />
            </div>
          </IconButton>
          <InputBase
            className={classes.input}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={inputPlaceHolder}
            ref={inputRef}
          />
          <IconButton className={classes.iconButton} onClick={showGiphy}>
            <GifIcon />
          </IconButton>
          <IconButton className={classes.iconButton} onClick={showEmojis}>
            <EmojiEmotionsIcon />
          </IconButton>
          <Box className={classes.emojiPicker}>
            {showEmojiPicker && (
              <ClickAwayListener onClickAway={() => setShowEmojisPicker(false)}>
                <EmojiPicker
                  // set="twitter"
                  native={true}
                  theme="dark"
                  color="#7289da"
                  style={{ background: '#2f3136' }}
                  onSelect={addEmoji}
                  // emoji="octopus"
                  emoji="space_invader"
                  title="Octopus"
                />
              </ClickAwayListener>
            )}
          </Box>
          <Box className={classes.emojiPicker}>
            {showGiphyPicker && <Picker onSelected={addGif} />}
          </Box>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton className={classes.iconButton} type="submit">
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
      <WorkInProgressDialog
        open={open}
        handleDialogClose={onDialogClose}
        text={text}
      />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  emojiPicker: {
    position: 'absolute',
    bottom: 56,
    right: 64,
    cssFloat: 'right',
    marginLeft: '200px',
  },
  messagesCompose: {
    position: 'relative',
    margin: '10px 10px 8px 10px',
    flexShrink: 1,
  },
  messagesComposeForm: {
    width: '100%',
  },
  root: {
    display: 'flex',
    padding: '2px 4px',
    alignItems: 'center',
    background: theme.palette.backgroundMessageInput,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: theme.palette.textNormal,
  },
  iconButton: {
    padding: 10,
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.interactiveHover,
    },
  },
  divider: {
    height: 28,
    margin: 4,
    background: theme.palette.backgroundSecondary,
  },
  customFileInputBox: {
    overflow: 'hidden',
    position: 'relative',
    display: 'inline-block',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  customFileInput: {
    cursor: 'pointer',
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
}));

/* .custom-file-input {
  overflow: hidden;
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.custom-file-input input[type="file"] {
  cursor: pointer;
  //height: 44px;
  // width: 44px;

  opacity: 0;
  filter: alpha(opacity=0);
  zoom: 1;  // Fix for IE7
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
} */

{
  /* <div className="custom-file-input">
              <AddCircleIcon />
              <input type="file" onChange={onChangeHandler} />
            </div> */
}
