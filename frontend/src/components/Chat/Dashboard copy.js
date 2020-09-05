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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';

import {
  joinRoom,
  createRoom,
  leaveRoom,
  roomDataHandler,
  messageHandler,
  sendMessage,
} from '../../utils/useSocket';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  chat: {
    width: '100%',
    height: '100vh',
    background: 'green',
    flexGrow: 1,
    position: 'fixed',
  },
  appBarSpacer: theme.mixins.toolbar,
  // scrollable: {
  //   position: 'relative',
  //   maxHeight: '100%',
  //   overflow: 'auto',
  // },
  scrollablea: {
    // position: 'relative',
    // maxHeight: '100%',
    // overflowY: 'scroll',
  },
  pxt: {
    display: 'flex',
  },
  channelsList: {
    background: 'red',
  },
  usersList: {
    background: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    // maxHeight: '100%',
    // overflow: 'auto',
    height: 'inherit',
    // display: 'block',
  },
  messageList: {
    // position: 'relative',
    overflowY: 'scroll',
  },
  messageListToolbar: {
    display: 'flex',
    justifyContent: 'center',
    background: 'pink',
    position: 'sticky',
  },
  messageListContainer: {
    padding: '10px 10px 70px',
    background: 'blue',
    overflowY: 'scroll',
  },

  compose: {
    padding: '10px',
    display: 'flex',
    background: 'purple',
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  composeInput: {
    flex: '1 1',
    border: 'none',
    fontSize: '14px',
    height: '40px',
  },
  bubble: {
    border: '1px solid #000',
  },
  message: {
    marginBottom: '16px',
  },
  message__name: {
    fontWeight: '600',
    fontSize: '14px',
    marginRight: '8px',
  },
  message__meta: {
    color: '#777',
    fontSize: '14px',
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
    createRoom(user._id, dialogValue, createCallback);
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
    leaveRoom(user._id, currentRoom, leaveCallback);
    joinRoom(user._id, dialogValue, joinCallback);
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
      <div className={classes.appBarSpacer}></div>
      <Grid container spacing={0} style={{ height: '100%' }}>
        <Grid item xs={1}>
          <Box className={classes.scrollable} height="100%">
            <Box className={classes.channelsList} height="100%">
              <List className={classes.root}>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                  (text, index) => (
                    <ListItem
                      key={text}
                      onClick={() => handleRoomClick(text)}
                      component={Link}
                      to={'/channel/' + text}
                    >
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
              <Divider />
              <List>
                <ListItem button onClick={(event) => handleAddClick(event)}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1} className={classes.scrollablea}>
          <Box className={classes.scrollable}>
            <Box className={classes.usersList}>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
              <Box className={classes.pxt}>User 1</Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={10}>
          {/* <Box className={classes.scrollable} height="100%"> */}
          <Box className={classes.messageList} height="100%">
            <Box className={classes.messageListToolbar}>
              Title of the channel
            </Box>
            <Box className={classes.messageListContainer}>
              <Box>Message 1</Box>
              <Box>Message 2</Box>
              <Box>Message 3</Box>
              <Box>Message 4</Box>
              <Box>Message 5</Box>
              <Box>Message 6</Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
              <Box className={classes.bubble}>
                <Avatar>KK</Avatar>
                <div className={classes.message}>
                  <p>
                    <span className={classes.message__name}>Kornel</span>
                    <span className={classes.message__meta}>12:12 PM</span>
                  </p>
                  <p>sadlkdjflksdjfkljdskfljdskljflkdsjlfk</p>
                </div>
              </Box>
            </Box>
            <Box className={classes.compose}>
              <input className={classes.composeInput}></input>
            </Box>
          </Box>
          {/* </Box> */}
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
