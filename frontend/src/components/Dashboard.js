import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { deepOrange, deepPurple } from '@material-ui/core/colors';

import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

import {
  joinRoom,
  createRoom,
  leaveRoom,
  roomDataHandler,
  messageHandler,
  sendMessage,
} from '../utils/useSocket';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  chat: {
    background: 'red',
    height: 'calc(100vh - 64px) !important',
    flexGrow: '1',
    // width: '100%',
    position: 'absolute',
    zIndex: '-2',
  },
  divider: {
    background: 'yellow',
    height: '4px',
  },
  flexDivider: {
    width: '100%',
  },

  channels: {
    width: '48px',
  },
  channelsList: {
    background: 'green',
    maxHeight: 'calc(100vh - 64px) !important',
    overflowX: 'hidden',
    height: '100%',
    // width: '60px',
    // overflowY: 'scroll',
  },
  channel: {},
  channelIcon: {
    width: '42px',
    height: '42px',
    margin: '3px 3px 3px 3px',
    background: 'white',
  },
  channelIconAvatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },

  usersList: {
    background: 'purple',
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
      background: '#eeeef1',
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
  },
  messagesBar: {
    background: 'yellow',
  },
  messagesList: {
    background: 'white',
    // maxHeight: '1000px',
    overflowY: 'scroll',
  },
  messagesListItem: {
    display: 'flex',
    // flexWrap: 'wrap',
    maxWidth: '100%',
    background: '#eeeef1',
    padding: '10px',
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
    color: '#888',
  },
  messagesListItemContent: {},

  messagesCompose: {
    display: 'flex',
    background: 'blue',
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    marginLeft: '100px',
    alignSelf: 'flex-end',
    padding: '10px',
    flexGrow: 1,
    // zIndex: '-1',
  },
  messagesComposeInput: {
    width: '100%',
    fontSize: '14px',
    height: '40px',
  },
}));

function Dashboard() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

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
          <Box className={classes.channelsList}>
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
            <Box className={classes.channel}>
              <Tooltip title="Add channel">
                <IconButton
                  aria-label="add"
                  className={classes.channelIcon}
                  onClick={handleAddClick}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box className={classes.usersList}>
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
            <Box className={classes.messagesBar}>Bar bar bar</Box>
            <Box className={classes.messagesList}>
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
                  <Box className={classes.messagesListItem}>
                    <Avatar className={classes.messagesListItemAvatar}>
                      {message.author[0]}
                      {message.author[1]}
                    </Avatar>
                    <Box>
                      <Box className={classes.messagesListItemInfo}>
                        <Box className={classes.messagesListItemUsername}>
                          {message.author}
                        </Box>
                        <Box className={classes.messagesListItemDate}>
                          {message.time}
                        </Box>
                      </Box>
                      <Box className={classes.flexDivider}></Box>
                      <Box className={classes.messagesListItemContent}>
                        {message.text}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box className={classes.messagesCompose}>
              {/* <Box style={{ marginLeft: '50px' }}> sdasd sasa das d</Box> */}
              <Box>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AddCircleIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="filled-textarea"
                      label="Multiline Placeholder"
                      placeholder="Placeholder"
                      multiline
                      variant="filled"
                    />
                  </Grid>
                </Grid>
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
      >
        <DialogTitle id="form-dialog-title">
          Create a new room or join existing one
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter a room name:</DialogContentText>
          <TextField
            onChange={(event) => setDialogValue(event.target.value)}
            value={dialogValue}
            autoFocus
            margin="dense"
            id="name"
            label="Room name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleJoinClick} color="primary">
            Join
          </Button>
          <Button onClick={handleCreateClick} color="primary">
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
