import React from 'react';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import AddRoomDialog from '../ui/dialogs/AddRoomDialog';
import HomeDashboard from './home/HomeDashboard';
import MessageArea from './message/MessageArea';
import MessageAreaBar from './message/MessageAreaBar';
import UserList from './user/UserList';
import RoomList from './room/RoomList';

import { useRoomData } from '../../context/RoomDataContext';
import {
  LEAVE_ROOM,
  NEW_MESSAGE,
  ROOM_DELETED,
  SET_CURRENT_ROOM,
  SET_ROOMS,
  UPDATE_ROOM,
  USER_LIST_CHANGED,
  USER_STATUS_CHANGED,
} from '../../context/actions/roomData';
import { useUserData } from '../../context/UserDataContext';

export default function ChatDashboard({ user, socket }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [roomDataState, roomDataDispatch] = useRoomData();
  const { currentRoom } = roomDataState;
  const {
    getLastOpenedRoom,
    setLastOpenedRoom,
    handleRoomDeleted,
  } = useUserData();

  const [dialogData, setDialogData] = React.useState({
    open: false,
    error: null,
  });

  React.useEffect(() => {
    document.title = currentRoom ? `#${currentRoom.name}` : 'typee';
  }, [currentRoom]);

  React.useEffect(() => {
    // console.log('useEffect');

    socket.connect(user._id, connectCallback);
    socket.onNewMessage(onNewMessage);
    socket.onNewRoomData(onNewRoomData);
    socket.onRoomUpdated(onRoomUpdated);
    socket.onRoomDeleted(onRoomDeleted);
    socket.onUserStatusChanged(onUserStatusChanged);
    // socket.requestUserData(user._id, requestUserDataCallback);

    const lastOpenedRoom = getLastOpenedRoom();
    if (lastOpenedRoom) {
      socket.joinRoom(user._id, lastOpenedRoom, joinRoomCallback);
    }
  }, []);

  const handleSubmit = (text) => {
    socket.sendMessage(text, currentRoom._id, user._id, submitCallback);
  };

  const handleCreateRoomClick = (roomName) => {
    socket.createRoom(user._id, roomName, createRoomCallback);
  };

  const handleJoinRoomClick = (roomName) => {
    socket.joinRoom(user._id, roomName, joinRoomCallback);
  };

  const roomUpdated = (oldName, newName) => {
    socket.roomUpdated(oldName, newName, roomUpdatedCallback);
  };

  const leaveRoom = (roomName) => {
    socket.leaveRoom(user._id, roomName, leaveRoomCallback);
  };

  const deleteRoom = (roomName) => {
    socket.deleteRoom(roomName, deleteRoomCallback);
  };

  const connectCallback = ({ error, user, rooms }) => {
    if (error) {
      // console.log('connectCallback ERROR', error);
      return;
    }

    roomDataDispatch({ type: SET_ROOMS, payload: rooms });

    // console.log('Successfully connected to the server.');
  };

  // const requestUserDataCallback = ({ error, user, rooms }) => {
  //   if (error) {
  //     console.log('requestUserDataCallback ERROR', error);
  //   }

  //   // Here eventually set new data with dispatch
  //   console.log('User data received.');
  // };

  const submitCallback = ({ error }) => {
    if (error) {
      // console.log('submitCallback ERROR', error);
      return;
    }

    // console.log('Message delivered successfully.');
  };

  const createRoomCallback = ({ error, room, rooms }) => {
    if (error) {
      // console.log('createRoomCallback ERROR', error);
      return setDialogData((prevState) => {
        return { ...prevState, error };
      });
    }

    roomDataDispatch({
      type: SET_CURRENT_ROOM,
      payload: room,
    });
    roomDataDispatch({ type: SET_ROOMS, payload: rooms });
    setLastOpenedRoom(room.name);

    enqueueSnackbar(`Room ${room.name} created`, {
      variant: 'success',
      autoHideDuration: 2000,
    });
    handleDialogClose();

    // console.log('Room created successfully.');
  };

  const joinRoomCallback = ({ error, room, rooms }) => {
    if (error) {
      // console.log('joinRoomCallback ERROR', error);
      return setDialogData((prevState) => {
        return { ...prevState, error };
      });
    }

    roomDataDispatch({
      type: SET_CURRENT_ROOM,
      payload: room,
    });

    setLastOpenedRoom(room.name);

    // If user joins room for the first time,
    // he needs new room list to be generated
    if (rooms) {
      roomDataDispatch({ type: SET_ROOMS, payload: rooms });
    }

    handleDialogClose();
    // console.log('Joined to room successfully.');
  };

  const roomUpdatedCallback = ({ error }) => {
    if (error) {
      // console.log('roomUpdatedCallback', error);
      return;
    }

    // console.log('Room updated successfully.');
  };

  const leaveRoomCallback = ({ error, room }) => {
    if (error) {
      // console.log('leaveRoomCallback ERROR', error);
      return;
    }

    roomDataDispatch({ type: LEAVE_ROOM, payload: room });
    handleRoomDeleted(room.name);

    enqueueSnackbar(`You left ${room.name}`, {
      variant: 'info',
      autoHideDuration: 2000,
    });

    // console.log(`Left ${room.name} successfully.`);
  };

  const deleteRoomCallback = ({ error, room }) => {
    if (error) {
      // console.log('handleDeleteRoomCallback', error);
      return;
    }

    roomDataDispatch({ type: ROOM_DELETED, payload: room });
    handleRoomDeleted(room.name);

    enqueueSnackbar(`Room ${room.name} deleted`, {
      variant: 'error',
      autoHideDuration: 2000,
    });

    // console.log(`The room ${room.name} has been deleted.`);
  };

  //#region callbacks

  const onUserStatusChanged = React.useCallback(
    (user) => {
      // console.log('onUserStatusChanged', user);
      roomDataDispatch({
        type: USER_STATUS_CHANGED,
        payload: user,
      });
    },
    [roomDataDispatch]
  );

  const onNewRoomData = React.useCallback(
    ({ users }) => {
      // console.log('onNewRoomData', users);
      roomDataDispatch({
        type: USER_LIST_CHANGED,
        payload: users,
      });
    },
    [roomDataDispatch]
  );

  const onNewMessage = React.useCallback(
    (message) => {
      roomDataDispatch({
        type: NEW_MESSAGE,
        payload: message,
      });
    },
    [roomDataDispatch]
  );

  const onRoomUpdated = React.useCallback(
    (room) => {
      // console.log('onRoomUpdated', room);
      roomDataDispatch({ type: UPDATE_ROOM, payload: room });
    },
    [roomDataDispatch]
  );

  const onRoomDeleted = React.useCallback(
    (room) => {
      // console.log('onRoomDeleted', room);
      roomDataDispatch({ type: ROOM_DELETED, payload: room });
      handleRoomDeleted(room.name);
    },
    [roomDataDispatch, handleRoomDeleted]
  );

  //#endregion

  // console.log('ChatDashboard RE-RENDER');

  const handleHomeClick = () => {
    roomDataDispatch({
      type: SET_CURRENT_ROOM,
      payload: undefined,
    });
  };

  const handleRoomClick = (roomName) => {
    if (currentRoom && roomName === currentRoom.name) {
      return;
    }

    socket.joinRoom(user._id, roomName, joinRoomCallback);
  };

  const handleAddRoomClick = () => {
    setDialogData({ open: true });
  };

  const handleDialogClose = () => {
    if (dialogData.open) {
      setDialogData({ open: false });
    }
  };

  return (
    <Box className={classes.chat}>
      <Grid container spacing={0}>
        <Grid item className={classes.rooms}>
          <RoomList
            rooms={roomDataState.rooms}
            handleHomeClick={handleHomeClick}
            handleRoomClick={handleRoomClick}
            handleAddClick={handleAddRoomClick}
          />
        </Grid>
        {currentRoom ? (
          <React.Fragment>
            <Grid item xs={2}>
              <UserList users={currentRoom.users} />
            </Grid>
            <Grid item xs>
              <Box className={classes.chatT}>
                <MessageAreaBar
                  socket={socket}
                  room={currentRoom}
                  isAuthor={currentRoom.author._id === user._id}
                  leaveRoom={leaveRoom}
                  deleteRoom={deleteRoom}
                  roomUpdated={roomUpdated}
                />
                <Box className={classes.content}>
                  <MessageArea
                    messages={currentRoom.messages}
                    handleMessageSubmit={handleSubmit}
                  />
                </Box>
              </Box>
            </Grid>
          </React.Fragment>
        ) : (
          <HomeDashboard socket={socket} />
        )}
      </Grid>
      <AddRoomDialog
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
    position: 'absolute',
    height: '100vh',
    width: '100%',
    zIndex: '-2',
    flexGrow: '1',
    overflow: 'hidden',
    background: 'red',
    color: theme.palette.textNormal,
    // height: 'calc(100vh - 64px) !important',
  },
  rooms: {
    paddingBottom: '12px',
    width: '72px',
    height: '100vh',
    overflow: 'hidden',
  },
  chatT: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    height: '100vh',
    overflow: 'hidden',
    background: theme.palette.backgroundPrimary,
    outline: 0,
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    alignItems: 'stretch',
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0,
    outline: 0,
  },
  messages: {
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    height: '100vh',
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0,
    outline: 0,
    overflow: 'hidden',
  },
}));
