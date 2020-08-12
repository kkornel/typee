import React from 'react';
// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import IconButton from '@material-ui/core/IconButton';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import MailIcon from '@material-ui/icons/Mail';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import DirectionsIcon from '@material-ui/icons/Directions';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import GifIcon from '@material-ui/icons/Gif';
import SendIcon from '@material-ui/icons/Send';
import { deepPurple } from '@material-ui/core/colors';

import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

import {
  joinRoom,
  // createRoom,
  leaveRoom,
  roomDataHandler,
  messageHandler,
  sendMessage,
} from '../utils/useSocket';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mainTheme = makeStyles((theme) => ({
  headerPrimary: {
    color: '#fff',
  },
  headerSecondary: {
    color: '#b9bbbe',
  },
  textNormal: {
    color: '#dcddde',
  },
  textMuted: {
    color: '#72767d',
  },
  textLink: {
    color: '#00b0f4',
  },
  channelsDefault: {
    // more muted
    color: '#8e9297',
  },
  interactiveNormal: {
    color: '#b9bbbe',
    '&:hover': {
      color: '#dcddde',
    },
  },
  rootxd: {
    '& label.Mui-focused': {
      color: '#7289da',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#7289da',
    },
  },
  interactiveNormalButton: {
    '&:hover': {
      backgroundColor: '#4f545c',
    },
  },
  interactiveHover: {
    color: '#dcddde',
  },
  interactiveActive: {
    color: '#fff',
  },
  interactiveMuted: {
    color: '#4f545c',
  },
  backgroundPrimary: {
    backgroundColor: '#36393f',
  },
  backgroundSecondary: {
    backgroundColor: '#2f3136',
  },
  backgroundSecondaryAlt: {
    backgroundColor: '#292b2f',
  },
  backgroundTertiary: {
    backgroundColor: '#202225',
  },
  backgroundAccent: {
    backgroundColor: '#4f545c',
  },
  backgroundFloating: {
    backgroundColor: '#18191c',
  },
  backgroundBlueHover: {
    backgroundColor: '#7289da',
  },
  backgroundGreenHover: {
    backgroundColor: '#43b581',
  },
}));

const useStyles = makeStyles((theme) => ({
  chat: {
    background: 'red',
    height: 'calc(100vh - 64px) !important',
    flexGrow: '1',
    // width: '100%',
    position: 'absolute',
    zIndex: '-2',
    color: '#dcddde',
  },
  divider: {
    background: 'hsla(0,0%,100%,0.06)',
    height: '4px',
  },
  flexDivider: {
    width: '100%',
  },

  channels: {
    width: '64px',
  },
  channelsList: {
    // background: 'green',
    // background: '#202225',

    maxHeight: 'calc(100vh - 64px) !important',
    overflowX: 'hidden',
    height: '100%',
    // width: '60px',
    // overflowY: 'scroll',
  },
  channel: {},
  channelIcon: {
    // width: '48px',
    // height: '48px',
    // margin: '3px 3px 3px 3px',
    // background: 'white',
    // background: '#36393f',
    padding: '8px',
  },
  channelIconAvatar: {
    width: '48px',
    height: '48px',
    color: '#dcddde',
    backgroundColor: '#36393f',
    // margin: '3px 3px 3px 3px',
    '&:hover': {
      backgroundColor: '#7289da',
      color: '#fff',
    },
  },
  channelAddBox: {
    padding: '8px',
  },
  channelAddIcon: {
    width: '48px',
    height: '48px',
    // margin: '3px 3px 3px 3px',
    // background: 'white',
    background: '#36393f',
    color: '#43b581',
    '&:hover': {
      background: '#43b581',
      color: '#fff',
    },
    // padding: 0,
    // margin: 0,
  },
  usersList: {
    // background: 'purple',
    // background: '#2f3136',
    maxHeight: 'calc(100vh - 64px) !important',
    // width: '90px',
    overflowX: 'hidden',
    // overflow: 'auto',
    height: '100%',
    overflowY: 'auto',
    // overflowY: 'scroll',
    zIndex: '1',
    position: 'relative',
  },
  usersListItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    width: '100%',
    '&:hover': {
      background: '#32353b',
      cursor: 'pointer',
    },
  },
  usersListItemAvatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  usersListItemInfo: {
    marginLeft: '10px',
  },
  usersListItemTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: '0',
  },
  usersListItemSubTitle: {
    fontSize: '14px',
    color: '#888',
    margin: '0',
  },

  messages: {
    // position: 'relative',
    display: 'flex',
    minWidth: '100%',
    flexDirection: 'column',
    height: 'calc(100vh - 64px) !important',
    alignItems: 'stretch',
  },
  messagesBar: {
    borderBottom: '1px solid #202225',
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
  messagesComposeInput: {
    // width: '100%',
    // alignSelf: 'flex-end',
    // height: '40px',
    flexGrow: 1,
  },
  messagesComposeForm: {
    padding: '8px 16px 8px 8px',
    width: '100%',
  },

  roota: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    background: '#40444b',
  },
  inputa: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButtona: {
    padding: 10,
  },
  dividera: {
    height: 28,
    margin: 4,
  },
}));

function Dashboard() {
  const classes = useStyles();
  const theme = mainTheme();
  // const { register, handleSubmit } = useForm();

  const { user } = useAuth();
  const { currentRoom, setCurrentRoom } = useUser();

  const [roomData, setRoomData] = React.useState(null);

  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState(false);

  const [dialogValue, setDialogValue] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  React.useEffect(() => {
    messageHandler(onMessageReceived);
    roomDataHandler(onRoomData);
  }, []);

  const onMessageReceived = ({ text, username, createdAt, error }) => {
    setNewMessage(false);
    console.log(text, username, createdAt);
    messages.push({ text, username, createdAt });
    setMessages(messages);
    setNewMessage(true);
  };

  const onRoomData = ({ users }) => {
    setRoomData(users);
  };

  const onSubmit = ({ message }, event) => {
    sendMessage(message, currentRoom, user._id, submitCallback);
    console.log(event.target.elements.message);
    event.target.elements.message.value = '';
  };

  const submitCallback = (error) => {
    console.log(error);

    if (error) {
      return console.log(error);
    }

    console.log('Message delivered.');
  };

  const handleRoomClick = (roomName) => {
    console.log(roomName);
    if (roomName !== currentRoom) {
      leaveRoom(user._id, currentRoom, leaveCallback);
    }
    setCurrentRoom(roomName);
    joinRoom(user._id, roomName, joinCallback);
  };

  const handleAddClick = (event) => {
    setOpenDialog(true);
  };

  const handleCreateClick = () => {
    // createRoom(user._id, dialogValue, createCallback);
    // TEMP:
    setSnackbarMessage(`${dialogValue} created!`);
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const createCallback = ({ error, room }) => {
    console.log(error, room);
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      return setOpenSnackbar(true);
    }

    setSnackbarMessage(`Room ${room.name} created.`);
    setSnackbarSeverity('success');
    setCurrentRoom(room.name);
    setOpenSnackbar(true);
    setOpenDialog(false);
  };

  const handleJoinClick = () => {
    // TEMP:
    setSnackbarMessage(`${dialogValue} joined!`);
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
    // leaveRoom(user._id, currentRoom, leaveCallback);
    // joinRoom(user._id, dialogValue, joinCallback);
  };

  const joinCallback = ({ error, room }) => {
    console.log(error, room);
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      return setOpenSnackbar(true);
    }

    setOpenDialog(false);
  };

  const leaveCallback = (somedata) => {
    console.log(somedata);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box className={classes.chat}>
      <Grid container spacing={0}>
        <Grid item className={classes.channels}>
          <Box
            className={classNames(
              classes.channelsList,
              theme.backgroundTertiary
            )}
          >
            {['Channel 1', 'Channel 2', 'Channel 3'].map((channelName) => {
              return (
                <Box className={classes.channel}>
                  <Tooltip title={channelName}>
                    <IconButton
                      aria-label={channelName}
                      className={classes.channelIcon}
                    >
                      <Avatar className={classes.channelIconAvatar}>
                        {channelName[0]}
                        {channelName[channelName.length - 1]}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            })}
            <Divider className={classes.divider} />
            <Box className={classes.channelAddBox}>
              <Tooltip title="Add channel">
                <IconButton
                  aria-label="add"
                  className={classes.channelAddIcon}
                  onClick={handleAddClick}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box
            className={classNames(classes.usersList, theme.backgroundSecondary)}
          >
            {[
              { name: 'Pani Zosia', subtitle: 'Byłam dziś w warzywniaku' },
              { name: 'Pani Krysia', subtitle: 'Very lon long lon long long' },
              {
                name: 'Pani Jadzia',
                subtitle: 'Czas na przerwe, czas na kitkat',
              },
            ].map((user) => {
              return (
                <Box className={classes.usersListItem}>
                  <Avatar className={classes.usersListItemAvatar}>
                    {user.name[0]}
                    {user.name[1]}
                  </Avatar>
                  <Box className={classes.usersListItemInfo}>
                    <Box className={classes.usersListItemTitle}>
                      {user.name}
                    </Box>
                    <Box className={classes.usersListItemSubTitle}>
                      {user.subtitle}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs>
          <Box className={classes.messages}>
            <Box
              className={classNames(
                classes.messagesBar,
                theme.backgroundPrimary
              )}
            >
              Bar bar bar
            </Box>
            <Box
              className={classNames(
                classes.messagesList,
                theme.backgroundPrimary
              )}
            >
              {[
                {
                  author: 'Pani ZOsia',
                  time: '13:34 PM',
                  text: `Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining
                    essentially unchanged.It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.Why
                    do we use it? It is a long established fact that a reader
                    will be distracted by the readable content of a page when
                    looking at its layout.The point of using Lorem Ipsum is
                    that it has a more- or - less normal distribution of letters,
                as opposed to using 'Content here, content here', making it
                    look like readable English.Many desktop publishing packages
                    and web page editors now use Lorem Ipsum as their default
                    model text, and a search for 'lorem ipsum' will uncover many
                    web sites still in their infancy. Various versions have
                    evolved over the years, sometimes by accident, sometimes on
                    purpose (injected humour and the like). Where does it come
                    from? Contrary to popular belief, Lorem Ipsum is not simply
                    random text. It has roots in a piece of classical Latin
                    literature from 45 BC, making it over 2000 years old.
                    Richard McClintock, a Latin professor at Hampden-Sydney
                    College in Virginia, looked up one of the more obscure Latin
                    words, consectetur, from a Lorem Ipsum passage, and going
                    through the cites of the word in classical literature,
                    discovered the undoubtable source. Lorem Ipsum comes from
                    sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                    Malorum" (The Extremes of Good and Evil) by Cicero, written
                    in 45 BC. This book is a treatise on the theory of ethics,
                    very popular during the Renaissance. The first line of Lorem
                    Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                    section 1.10.32. The standard chunk of Lorem Ipsum used
                    since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
                    Malorum" by Cicero are also reproduced in their exact
                    original form, accompanied by English versions from the 1914
                    translation by H. Rackham.`,
                },
                {
                  author: 'Pani Danusia',
                  time: '13:34 PM',
                  text: `Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining
                    essentially unchanged.It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.Why
                    do we use it? It is a long established fact that a reader
                    will be distracted by the readable content of a page when
                    looking at its layout.The point of using Lorem Ipsum is
                    that it has a more- or - less normal distribution of letters,
                as opposed to using 'Content here, content here', making it
                    look like readable English.Many desktop publishing packages
                    and web page editors now use Lorem Ipsum as their default
                    model text, and a search for 'lorem ipsum' will uncover many
                    web sites still in their infancy. Various versions have
                    evolved over the years, sometimes by accident, sometimes on
                    purpose (injected humour and the like). Where does it come
                    from? Contrary to popular belief, Lorem Ipsum is not simply
                    random text. It has roots in a piece of classical Latin
                    literature from 45 BC, making it over 2000 years old.
                    Richard McClintock, a Latin professor at Hampden-Sydney
                    College in Virginia, looked up one of the more obscure Latin
                    words, consectetur, from a Lorem Ipsum passage, and going
                    through the cites of the word in classical literature,
                    discovered the undoubtable source. Lorem Ipsum comes from
                    sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                    Malorum" (The Extremes of Good and Evil) by Cicero, written
                    in 45 BC. This book is a treatise on the theory of ethics,
                    very popular during the Renaissance. The first line of Lorem
                    Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                    section 1.10.32. The standard chunk of Lorem Ipsum used
                    since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
                    Malorum" by Cicero are also reproduced in their exact
                    original form, accompanied by English versions from the 1914
                    translation by H. Rackham.`,
                },
                {
                  author: 'Pani Krysia',
                  time: '13:34 PM',
                  text: `Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining
                    essentially unchanged.It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.Why
                    do we use it? It is a long established fact that a reader
                    will be distracted by the readable content of a page when
                    looking at its layout.The point of using Lorem Ipsum is
                    that it has a more- or - less normal distribution of letters,
                as opposed to using 'Content here, content here', making it
                    look like readable English.Many desktop publishing packages
                    and web page editors now use Lorem Ipsum as their default
                    model text, and a search for 'lorem ipsum' will uncover many
                    web sites still in their infancy. Various versions have
                    evolved over the years, sometimes by accident, sometimes on
                    purpose (injected humour and the like). Where does it come
                    from? Contrary to popular belief, Lorem Ipsum is not simply
                    random text. It has roots in a piece of classical Latin
                    literature from 45 BC, making it over 2000 years old.
                    Richard McClintock, a Latin professor at Hampden-Sydney
                    College in Virginia, looked up one of the more obscure Latin
                    words, consectetur, from a Lorem Ipsum passage, and going
                    through the cites of the word in classical literature,
                    discovered the undoubtable source. Lorem Ipsum comes from
                    sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                    Malorum" (The Extremes of Good and Evil) by Cicero, written
                    in 45 BC. This book is a treatise on the theory of ethics,
                    very popular during the Renaissance. The first line of Lorem
                    Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                    section 1.10.32. The standard chunk of Lorem Ipsum used
                    since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
                    Malorum" by Cicero are also reproduced in their exact
                    original form, accompanied by English versions from the 1914
                    translation by H. Rackham.`,
                },
              ].map((message) => {
                return (
                  <Box
                    className={classNames(
                      classes.messagesListItem,
                      theme.backgroundPrimary
                    )}
                  >
                    <Avatar className={classes.messagesListItemAvatar}>
                      {message.author[0]}
                      {message.author[1]}
                    </Avatar>
                    <Box>
                      <Box className={classes.messagesListItemInfo}>
                        <Box
                          className={classNames(
                            classes.messagesListItemUsername,
                            theme.headerPrimary
                          )}
                        >
                          {message.author}
                        </Box>
                        <Box
                          className={classNames(
                            classes.messagesListItemDate,
                            theme.textMuted
                          )}
                        >
                          {message.time}
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
            <Box
              className={classNames(
                classes.messagesCompose,
                theme.backgroundPrimary
              )}
            >
              {/* <Box style={{ marginLeft: '50px' }}> sdasd sasa das d</Box> */}
              <Box className={classes.messagesComposeForm}>
                <Paper component="form" className={classes.roota}>
                  <IconButton
                    className={classNames(
                      classes.iconButtona,
                      theme.interactiveNormal
                    )}
                    aria-label="menu"
                  >
                    <AddCircleIcon />
                  </IconButton>
                  <InputBase
                    className={classNames(classes.inputa, theme.textNormal)}
                    multiline
                    rowsMax="3"
                    placeholder="Message #CHANNEL_NAME"
                    inputProps={{
                      'aria-label': 'Message #CHANNEL_NAME',
                    }}
                  />
                  <IconButton
                    type="submit"
                    className={classNames(
                      classes.iconButtona,
                      theme.interactiveNormal
                    )}
                    aria-label="search"
                  >
                    <GifIcon />
                  </IconButton>
                  <IconButton
                    type="submit"
                    className={classNames(
                      classes.iconButtona,
                      theme.interactiveNormal
                    )}
                    aria-label="search"
                  >
                    <EmojiEmotionsIcon />
                  </IconButton>
                  <Divider
                    className={classNames(
                      classes.dividera,
                      theme.backgroundSecondary
                    )}
                    orientation="vertical"
                  />
                  <IconButton
                    color="primary"
                    className={classNames(
                      classes.iconButtona,
                      theme.interactiveNormal
                    )}
                    aria-label="directions"
                  >
                    <SendIcon />
                  </IconButton>
                </Paper>
                {/* <Grid container alignItems="flex-end">
                  <Grid item>
                    <AddCircleIcon />
                  </Grid>
                  <Grid item className={classes.messagesComposeInput}>
                    <TextField
                      id="filled-textarea"
                      label="Multiline Placeholder"
                      placeholder="Placeholder"
                      multiline
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                </Grid> */}
              </Box>
              {/* <input className={classes.messagesComposeInput} /> */}
              {/* <Box style={{ marginLeft: '50px' }}> sdasd sasa das d</Box> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: '#36393f',
            color: '#dcddde',
          },
        }}
      >
        <DialogTitle id="form-dialog-title">
          Create a new room or join existing one
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: '#dcddde' }}>
            Please enter a room name:
          </DialogContentText>
          <TextField
            onChange={(event) => setDialogValue(event.target.value)}
            value={dialogValue}
            autoFocus
            margin="dense"
            id="name"
            label="Room name"
            type="text"
            fullWidth
            className={theme.rootxd}
            InputProps={{
              style: {
                color: '#dcddde',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            className={classNames(
              theme.interactiveNormal,
              theme.interactiveNormalButton
            )}
          >
            Cancel
          </Button>
          <Button
            onClick={handleJoinClick}
            className={classNames(
              theme.interactiveNormal,
              theme.interactiveNormalButton
            )}
          >
            Join
          </Button>
          <Button
            onClick={handleCreateClick}
            className={classNames(
              theme.interactiveNormal,
              theme.interactiveNormalButton
            )}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );

  // <Box id="compose" className={classes.compose}>
  //   <form
  //     noValidate
  //     autoComplete="off"
  //     className={classes.compose_form}
  //     onSubmit={handleSubmit(onSubmit)}
  //     margin="dense"
  //   >
  //     <Input
  //       autoFocus
  //       required
  //       fullWidth
  //       margin="dense"
  //       variant="outlined"
  //       id="message"
  //       name="message"
  //       label="message"
  //       placeholder="Message"
  //       // inputProps={{ 'aria-label': 'description' }}
  //       inputRef={register}
  //       className={classes.compose_input}
  //     />
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       endIcon={<Icon>send</Icon>}
  //       className={classes.compose_button}
  //     >
  //       Send
  //               </Button>
  //   </form>
  // </Box>
}

export default Dashboard;
