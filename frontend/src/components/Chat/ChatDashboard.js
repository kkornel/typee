import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { useUser } from '../../context/UserContext';

import MessageInput from './MessageInput';
import MessageArea from './MessageArea';
import MessageAreaBar from './MessageAreaBar';
import Dialog from './Dialog';
import Snackbar from './Snackbar';
import UserList from './UserList';
import ChannelList from './ChannelList';

function ChatDashboard({
  user,
  connect,
  sendMessage,
  newMessageHandler,
  roomDataHandler,
  createRoom,
  joinRoom,
  leaveRoom,
}) {
  const classes = useStyles();

  const { currentRoom, setCurrentRoom } = useUser('asdas');

  const [roomData, setRoomData] = React.useState({ name: 'asdas' });

  const [messages, setMessages] = React.useState([]);

  const [openDialog, setOpenDialog] = React.useState(false);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  React.useEffect(() => {
    newMessageHandler(onMessageReceived);
    // roomDataHandler(onRoomData);
  }, []);

  const onRoomData = ({ users }) => {
    setRoomData(users);
  };

  const handleRoomClick = (roomName) => {
    console.log(roomName);
    if (roomName !== currentRoom) {
      leaveRoom(user._id, currentRoom, leaveCallback);
    }
    setCurrentRoom(roomName);
    joinRoom(user._id, roomName, joinRoomCallback);
  };

  const leaveCallback = (somedata) => {
    console.log(somedata);
  };

  console.log('&&& ChatDashboard RE-RENDER');

  const handleAddRoomClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleJoinRoomClick = (dialogValue) => {
    // TEMP:
    // setSnackbarMessage(`${dialogValue} joined!`);
    // setSnackbarSeverity('error');
    // setOpenSnackbar(true);
    // TODO: leave?
    // leaveRoom(user._id, currentRoom, leaveCallback);
    joinRoom(user._id, dialogValue, joinRoomCallback);
  };

  const joinRoomCallback = ({ error, room }) => {
    console.log('joinRoomCallback', error, room);

    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      return setOpenSnackbar(true);
    }

    setRoomData(room);
    handleDialogClose();
  };

  const handleCreateRoomClick = (dialogValue) => {
    createRoom(user._id, dialogValue, createRoomCallback);
  };

  const createRoomCallback = ({ error, room }) => {
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
    handleDialogClose();
    // TODO: Open this room page
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = (inputValue) => {
    sendMessage(inputValue, roomData.name, user._id, submitCallback);
  };

  const submitCallback = (error) => {
    if (error) {
      return console.log(error);
    }

    console.log('Message delivered.');
  };

  const onMessageReceived = ({ text, username, createdAt }) => {
    messages.push({ text, username, createdAt });
    setMessages([...messages]);
  };

  return (
    <Box className={classes.chat}>
      <Grid container spacing={0}>
        <Grid item className={classes.channels}>
          <ChannelList channels={null} handleAddClick={handleAddRoomClick} />
        </Grid>
        <Grid item xs={1}>
          <UserList users={null} />
        </Grid>
        <Grid item xs>
          <Box className={classes.messages}>
            <MessageAreaBar text={'Bar bar bar'} />
            <MessageArea messages={messages} />
            <MessageInput handleMessageSubmit={handleSubmit} />
          </Box>
        </Grid>
      </Grid>
      <Dialog
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        handleJoinRoomClick={handleJoinRoomClick}
        handleCreateRoomClick={handleCreateRoomClick}
      />
      <Snackbar
        openSnackbar={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </Box>
  );
}

export default ChatDashboard;

const useStyles = makeStyles((theme) => ({
  chat: {
    background: 'red',
    height: 'calc(100vh - 64px) !important',
    flexGrow: '1',
    // width: '100%',
    position: 'absolute',
    zIndex: '-2',
    color: '#dcddde',
    width: '100%',
  },
  channels: {
    width: '64px',
  },
  messages: {
    // position: 'relative',
    display: 'flex',
    minWidth: '100%',
    flexDirection: 'column',
    height: 'calc(100vh - 64px) !important',
    alignItems: 'stretch',
  },
}));
