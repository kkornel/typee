import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { useSnackbar } from 'notistack';

import { useUserData } from '../../context/UserDataContext';

import MessageInput from './MessageInput';
import MessageArea from './MessageArea';
import MessageAreaBar from './MessageAreaBar';
import Dialog from './Dialog';
import UserList from './UserList';
import RoomList from './RoomList';

import { useRoomData } from '../../utils/useRoomData';

// function messageReducer(state, action) {
//   switch (action.type) {
//     case 'NEW_MESSAGE':
//       console.log('reducer', state);
//       return [...state, action.payload];
//     default:
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// }

function ChatDashboard({
  user,
  connect,
  sendMessage,
  newMessageHandler,
  unregisterMessageHandler,
  newUserDataHandler,
  requestUserData,
  roomDataHandler,
  createRoom,
  joinRoom,
  leaveRoom,
  // currentRoomLOL,
  // messagesLOL,
  // dispatchLOL,
}) {
  // const [state, dispatch] = React.useReducer(messageReducer, []);

  const { messages, dispatch } = useRoomData();

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  // const [messages, setMessages] = React.useState([]);
  const [dialogData, setDialogData] = React.useState({
    open: false,
    error: '',
  });

  React.useEffect(() => {
    console.log('useEffect');
    newMessageHandler(onMessageReceived);
    newUserDataHandler(onUserDataReceived);
    requestUserData(user._id);
  }, []);

  // React.useEffect(() => {
  //   console.log('useEffect !!');
  //   newMessageHandler(onMessageReceived);
  //   return () => {
  //     console.log('useEffect !! unregister');
  //     unregisterMessageHandler(onMessageReceived);
  //   };
  // }, [messages]);

  // const { currentRoom, setCurrentRoom } = useUser('a');
  const { rooms, setRooms } = useUserData();

  const [currentRoom, setCurrentRoom] = React.useState({ name: 'a' });

  const onUserDataReceived = ({ rooms }) => {
    console.log('onUserDataReceived', rooms);
    setRooms(rooms);
  };

  const joinRoomCallback = ({ error, room, rooms }) => {
    console.log('joinRoomCallback', error, room, rooms);

    if (error) {
      return setDialogData((prevState) => {
        return { ...prevState, error };
      });
    }

    setCurrentRoom(room);
    // setMessages((prevMessages) => [...prevMessages, ...room.messages]);
    dispatch({ type: 'LOAD_MESSAGES', payload: room.messages });

    if (dialogData.open) {
      handleDialogClose();
    }
  };

  const createRoomCallback = ({ error, room, rooms }) => {
    console.log('createRoomCallback', error, room, rooms);

    if (error) {
      return setDialogData((prevState) => {
        return { ...prevState, error };
      });
    }

    // TODO: how to store rooms and room?
    setRooms(rooms);
    setCurrentRoom(room);

    enqueueSnackbar(`Room ${room.name} created.`, {
      variant: 'success',
      autoHideDuration: 2000,
    });
    handleDialogClose();

    // TODO: Open this room page
  };

  const onMessageReceived = (message) => {
    // console.log('onMessageReceived prevMessages', messagesLOL);
    // console.log('onMessageReceived message', message);
    // setMessages((prevMessages) => [...prevMessages, message]);
    dispatch({ type: 'NEW_MESSAGE', payload: message });
    // dispatchLOL({ type: 'NEW_MESSAGE', payload: message });
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
    setDialogData({ open: true });
  };

  const handleDialogClose = () => {
    setDialogData({ open: false });
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

  const handleCreateRoomClick = (dialogValue) => {
    createRoom(user._id, dialogValue, createRoomCallback);
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
            <MessageAreaBar text={currentRoom.name} />
            <MessageArea messages={messages} />
            <MessageInput handleMessageSubmit={handleSubmit} />
          </Box>
        </Grid>
      </Grid>
      <Dialog
        dialogData={dialogData}
        handleDialogClose={handleDialogClose}
        handleJoinRoomClick={handleJoinRoomClick}
        handleCreateRoomClick={handleCreateRoomClick}
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
