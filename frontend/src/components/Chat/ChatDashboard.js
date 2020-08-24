import React from 'react';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Dialog from './Dialog';
import MessageArea from './MessageArea';
import MessageAreaBar from './MessageAreaBar';
import MessageInput from './MessageInput';
import UserList from './UserList';
import RoomList from './RoomList';

import { useUserData } from '../../context/UserDataContext';

import {
  useRoomData,
  ACTIONS as ROOM_DATA_ACTIONS,
} from '../../context/RoomDataContext';

export default function ChatDashboard({ user, socket }) {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const [roomDataState, roomDataDispatch] = useRoomData();
  const { currentRoom } = roomDataState;
  const { getLastOpenedRoom, setLastOpenedRoom } = useUserData();

  const [dialogData, setDialogData] = React.useState({
    open: false,
    error: null,
  });

  React.useEffect(() => {
    console.log('useEffect');
    socket.connect(user._id, connectCallback);
    socket.onNewMessage(onNewMessage);
    socket.onNewRoomData(onNewRoomData);
    socket.onNewUserData(onNewUserData);
    socket.onUserStatusChanged(onUserStatusChanged);
    socket.requestUserData(user._id);
    socket.joinRoom(user._id, getLastOpenedRoom(), joinRoomCallback);
  }, []);

  const onLeaveClick = () => {
    console.log('onLeaveClick');
  };

  const connectCallback = ({ error, user }) => {
    console.log('connectCallback', error, user);
  };

  const onNewMessage = React.useCallback(
    (message) => {
      roomDataDispatch({
        type: ROOM_DATA_ACTIONS.NEW_MESSAGE,
        payload: message,
      });
    },
    [roomDataDispatch]
  );

  const onNewUserData = React.useCallback(
    ({ rooms }) => {
      console.log('onNewUserData', rooms);
      // userData.setRooms(rooms);
      // userData.dispatch({ type: USER_DATA_ACTIONS.SET_ROOMS, payload: rooms });
      roomDataDispatch({ type: ROOM_DATA_ACTIONS.SET_ROOMS, payload: rooms });
    },
    [roomDataDispatch]
  );

  const onUserStatusChanged = React.useCallback(
    (user) => {
      console.log('onUserStatusChanged', user);
      roomDataDispatch({
        type: ROOM_DATA_ACTIONS.USER_STATUS_CHANGED,
        payload: user,
      });
    },
    [roomDataDispatch]
  );

  const onNewRoomData = React.useCallback(
    ({ users }) => {
      console.log('onNewRoomData', users);
      roomDataDispatch({
        type: ROOM_DATA_ACTIONS.USER_LIST_CHANGED,
        payload: users,
      });
    },
    [roomDataDispatch]
  );

  const joinRoomCallback = ({ error, room, rooms }) => {
    console.log('joinRoomCallback', error, room, rooms);

    if (error) {
      return setDialogData((prevState) => {
        return { ...prevState, error };
      });
    }

    // TODO: hmm?
    if (currentRoom) {
      console.log("There is some room so I'll leave it");
      socket.leaveRoom(user._id, currentRoom.name, leaveCallback);
    }

    roomDataDispatch({ type: ROOM_DATA_ACTIONS.LOAD_ROOM, payload: room });
    setLastOpenedRoom(room.name);
    // userData.dispatch({ type: USER_DATA_ACTIONS.SET_ROOMS, payload: rooms });
    roomDataDispatch({ type: ROOM_DATA_ACTIONS.SET_ROOMS, payload: rooms });
    // userData.setRooms(rooms);

    handleDialogClose();
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

    roomDataDispatch({
      type: ROOM_DATA_ACTIONS.SET_CURRENT_ROOM,
      payload: room,
    });
    roomDataDispatch({ type: ROOM_DATA_ACTIONS.SET_ROOMS, payload: rooms });
    setLastOpenedRoom(room.name);

    enqueueSnackbar(`Room ${room.name} created.`, {
      variant: 'success',
      autoHideDuration: 2000,
    });
    handleDialogClose();

    // TODO: Open this room page
  };

  const leaveCallback = (somedata) => {
    console.log('leaveCallback', somedata);
  };

  console.log('&&& ChatDashboard RE-RENDER');

  const handleAddRoomClick = () => {
    setDialogData({ open: true });
  };

  const handleJoinRoomClick = (dialogValue) => {
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

  const handleDialogClose = () => {
    if (dialogData.open) {
      setDialogData({ open: false });
    }
  };

  const handleRoomClick = (roomName) => {
    // if (roomName === currentRoom?.name) {
    if (roomName === currentRoom.name) {
      return;
    }

    socket.joinRoom(user._id, roomName, joinRoomCallback);
  };

  // If user clears cache it's no working
  if (!currentRoom) {
    // return <FullPageSpinner />;
  }

  return (
    <Box className={classes.chat}>
      <Grid container spacing={0}>
        <Grid item className={classes.channels}>
          <RoomList
            rooms={roomDataState.rooms}
            handleRoomClick={handleRoomClick}
            handleAddClick={handleAddRoomClick}
          />
          <Button onClick={socket.disconnet}>disconnet</Button>
        </Grid>
        <Grid item xs={1}>
          <UserList users={currentRoom.users} />
        </Grid>
        <Grid item xs>
          <Box className={classes.messages}>
            <MessageAreaBar
              room={currentRoom}
              isAuthor={currentRoom.author === user._id}
              onLeaveClick={onLeaveClick}
            />
            <MessageArea messages={currentRoom.messages} />
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

const useStyles = makeStyles((theme) => ({
  chat: {
    background: 'red',
    color: theme.palette.textNormal,
    flexGrow: '1',
    height: 'calc(100vh - 64px) !important',
    position: 'absolute',
    width: '100%',
    zIndex: '-2',
  },
  channels: {
    width: '64px',
  },
  messages: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100%',
    height: 'calc(100vh - 64px) !important',
  },
}));
