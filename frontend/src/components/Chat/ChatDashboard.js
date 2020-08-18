import React from 'react';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import MessageInput from './MessageInput';
import MessageArea from './MessageArea';
import MessageAreaBar from './MessageAreaBar';
import Dialog from './Dialog';
import UserList from './UserList';
import RoomList from './RoomList';

import { useUserData } from '../../context/UserDataContext';
import { useRoomData, ACTIONS } from '../../utils/useRoomData';
import { Button } from '@material-ui/core';

function ChatDashboard({ user, socket }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { messages, currentRoom, users, dispatch } = useRoomData();
  const {
    rooms,
    setRooms,
    getLastOpenedRoom,
    setLastOpenedRoom,
  } = useUserData();

  const [dialogData, setDialogData] = React.useState({
    open: false,
    error: '',
  });

  const connectCallback = ({ error, user }) => {
    console.log('connectCallback', error, user);
  };

  const onNewUserData = React.useCallback(
    ({ rooms }) => {
      console.log('onUserDataReceived', rooms);
      setRooms(rooms);
    },
    [setRooms]
  );

  const onUserStatusChanged = React.useCallback(
    (user) => {
      console.log('onUserLeft', user);
      dispatch({ type: ACTIONS.USER_STATUS_CHANGED, payload: user });
    },
    [dispatch]
  );

  const onNewRoomData = React.useCallback(
    ({ users }) => {
      console.log('onNewRoomDataReceived', users);
      dispatch({ type: ACTIONS.USER_LIST_CHANGED, payload: users });
    },
    [dispatch]
  );

  const joinRoomCallback = ({ error, room, rooms }) => {
    console.log('joinRoomCallback', error, room, rooms);

    if (error) {
      return setDialogData((prevState) => {
        return { ...prevState, error };
      });
    }

    if (currentRoom) {
      console.log("There is some room so I'll leave it");
      socket.leaveRoom(user._id, currentRoom.name, leaveCallback);
    }

    dispatch({ type: ACTIONS.LOAD_ROOM, payload: room });
    // dispatch({ type: ACTIONS.SET_CURRENT_ROOM, payload: room });
    // dispatch({ type: ACTIONS.LOAD_MESSAGES, payload: room.messages });
    // dispatch({ type: ACTIONS.USER_LIST_CHANGED, payload: room.users });
    setLastOpenedRoom(room.name);
    setRooms(rooms);

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
    if (currentRoom) {
      console.log("There is some room so I'll leave it");
      socket.leaveRoom(user._id, currentRoom.name, leaveCallback);
    }

    dispatch({ type: ACTIONS.SET_CURRENT_ROOM, payload: room });
    setRooms(rooms);
    setLastOpenedRoom(room.name);

    enqueueSnackbar(`Room ${room.name} created.`, {
      variant: 'success',
      autoHideDuration: 2000,
    });
    handleDialogClose();

    // TODO: Open this room page
  };

  const onNewMessage = React.useCallback(
    (message) => {
      dispatch({ type: ACTIONS.NEW_MESSAGE, payload: message });
    },
    [dispatch]
  );

  const leaveCallback = (somedata) => {
    console.log('leaveCallback', somedata);
  };

  const handleRoomClick = (roomName) => {
    if (roomName === currentRoom?.name) {
      return;
    }

    // leaveRoom(user._id, currentRoom.name, leaveCallback);
    socket.joinRoom(user._id, roomName, joinRoomCallback);
  };

  console.log('&&& ChatDashboard RE-RENDER');

  const handleAddRoomClick = () => {
    setDialogData({ open: true });
  };

  const handleDialogClose = () => {
    setDialogData({ open: false });
  };

  const handleJoinRoomClick = (dialogValue) => {
    // TODO: leave?
    // leaveRoom(user._id, currentRoom, leaveCallback);
    socket.joinRoom(user._id, dialogValue, joinRoomCallback);
  };

  const handleCreateRoomClick = (dialogValue) => {
    socket.createRoom(user._id, dialogValue, createRoomCallback);
  };

  const handleSubmit = (inputValue) => {
    socket.sendMessage(inputValue, currentRoom.name, user._id, submitCallback);
  };

  const submitCallback = (error) => {
    if (error) {
      return console.log(error);
    }

    console.log('Message delivered.');
  };

  React.useEffect(() => {
    console.log('useEffect');
    socket.connect(user._id, connectCallback);
    socket.onNewMessage(onNewMessage);
    socket.onNewRoomData(onNewRoomData);
    socket.onNewUserData(onNewUserData);
    socket.onUserStatusChanged(onUserStatusChanged);
    socket.requestUserData(user._id);
    socket.joinRoom(user._id, getLastOpenedRoom(), joinRoomCallback);
  }, [
    getLastOpenedRoom,
    onNewMessage,
    onNewRoomData,
    onNewUserData,
    onUserStatusChanged,
    socket,
    user._id,
  ]);

  return (
    <Box className={classes.chat}>
      <Grid container spacing={0}>
        <Grid item className={classes.channels}>
          <RoomList
            rooms={rooms}
            handleRoomClick={handleRoomClick}
            handleAddClick={handleAddRoomClick}
          />
          <Button onClick={socket.disconnet}>disconnet</Button>
        </Grid>
        <Grid item xs={1}>
          <UserList users={users} />
        </Grid>
        <Grid item xs>
          <Box className={classes.messages}>
            <MessageAreaBar text={currentRoom?.name} />
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
