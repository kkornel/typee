import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { useUserData } from '../../context/UserDataContext';

import MessageInput from './MessageInput';
import MessageArea from './MessageArea';
import MessageAreaBar from './MessageAreaBar';
import Dialog from './Dialog';
import Snackbar from './Snackbar';
import UserList from './UserList';
import RoomList from './RoomList';

function ChatDashboard({
  user,
  connect,
  sendMessage,
  newMessageHandler,
  newUserDataHandler,
  requestUserData,
  roomDataHandler,
  createRoom,
  joinRoom,
  leaveRoom,
}) {
  const classes = useStyles();

  // const { currentRoom, setCurrentRoom } = useUser('a');

  const [currentRoom, setCurrentRoom] = React.useState({ name: 'a' });

  const [messages, setMessages] = React.useState([]);

  const [openDialog, setOpenDialog] = React.useState(false);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  React.useEffect(() => {
    newMessageHandler(onMessageReceived);
    newUserDataHandler(onUserDataReceived);
    requestUserData(user._id);
    // roomDataHandler(onRoomData);
  }, []);

  const onRoomData = ({ users }) => {
    setCurrentRoom(users);
  };

  // const [rooms, setRooms] = React.useState([]);
  const { rooms, setRooms } = useUserData();
  const onUserDataReceived = ({ rooms }) => {
    console.log('1', rooms);
    setRooms(rooms);
  };

  // const handleRoomClick = (roomName) => {
  //   console.log(roomName);
  //   if (roomName !== currentRoom) {
  //     leaveRoom(user._id, currentRoom, leaveCallback);
  //   }
  //   setCurrentRoom(roomName);
  //   joinRoom(user._id, roomName, joinRoomCallback);
  // };

  const leaveCallback = (somedata) => {
    console.log(somedata);
  };

  const handleRoomClick = (roomName) => {
    joinRoom(user._id, roomName, joinRoomCallback);
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

  const joinRoomCallback = ({ error, room, rooms }) => {
    console.log('joinRoomCallback', error, room, rooms);

    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      return setOpenSnackbar(true);
    }

    setCurrentRoom(room);
    handleDialogClose();
  };

  const handleCreateRoomClick = (dialogValue) => {
    createRoom(user._id, dialogValue, createRoomCallback);
  };

  const createRoomCallback = ({ error, room, rooms }) => {
    console.log('createRoomCallback', error, room, rooms);

    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      return setOpenSnackbar(true);
    }

    setSnackbarMessage(`Room ${room.name} created.`);
    setSnackbarSeverity('success');
    setRooms(rooms);
    setCurrentRoom(room);
    setOpenSnackbar(true);
    handleDialogClose();
    // TODO: Open this room page
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = (inputValue) => {
    sendMessage(inputValue, currentRoom.name, user._id, submitCallback);
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
          <RoomList
            rooms={rooms}
            handleRoomClick={handleRoomClick}
            handleAddClick={handleAddRoomClick}
          />
        </Grid>
        <Grid item xs={1}>
          <UserList users={currentRoom.users} />
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
