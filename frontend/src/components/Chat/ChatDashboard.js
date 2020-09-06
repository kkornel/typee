import React from 'react';

import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import AddRoomDialog from './room/AddRoomDialog';
import HomeDashboard from './home/HomeDashboard';
import MessageArea from './message/MessageArea';
import MessageAreaBar from './message/MessageAreaBar';
import UserList from './user/UserList';
import RoomList from './room/RoomList';

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
  // const { setLastOpenedRoom } = useUserData();
  const { getLastOpenedRoom, setLastOpenedRoom } = useUserData();

  const [dialogData, setDialogData] = React.useState({
    open: false,
    error: null,
  });

  React.useEffect(() => {
    console.log('useEffect');
    socket.connect(user._id, connectCallback);
    socket.requestUserData(user._id, requestUserDataCallback);
    socket.onNewMessage(onNewMessage);
    socket.onNewRoomData(onNewRoomData);
    socket.onNewUserData(onNewUserData);
    socket.onRoomUpdated(onRoomUpdated);
    socket.onRoomDeleted(onRoomDeleted);
    socket.onUserStatusChanged(onUserStatusChanged);

    // TODO: is it necessary?
    // socket.joinRoom(user._id, getLastOpenedRoom(), joinRoomCallback);
  }, []);

  const connectCallback = ({ error, user }) => {
    if (error) {
      return console.log('connectCallback ERROR', error);
    }

    console.log('Successfully connected to the server.', user);
  };

  const requestUserDataCallback = ({ error }) => {
    if (error) {
      console.log('requestUserDataCallback ERROR', error);
    }
  };

  const submitCallback = ({ error }) => {
    if (error) {
      return console.log('submitCallback ERROR', error);
    }

    console.log('Message delivered successfully.');
  };

  const createRoomCallback = ({ error, room, rooms }) => {
    if (error) {
      console.log('createRoomCallback ERROR', error);
      return setDialogData((prevState) => {
        return { ...prevState, error };
      });
    }

    // TODO: how to store rooms and room?
    if (currentRoom) {
      console.log("TODO: (??) There is some room so I'll leave it");
      // socket.leaveRoom(user._id, currentRoom.name, leaveCallback);
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

    console.log('Room created successfully.', room, rooms);
  };

  const joinRoomCallback = ({ error, room, rooms }) => {
    if (error) {
      console.log('joinRoomCallback ERROR', error);
      return setDialogData((prevState) => {
        return { ...prevState, error };
      });
    }

    // TODO: hmm?
    if (currentRoom) {
      console.log("TODO: (??) There is some room so I'll leave it");
      // socket.leaveRoom(user._id, currentRoom.name, leaveCallback);
    }

    roomDataDispatch({
      type: ROOM_DATA_ACTIONS.SET_CURRENT_ROOM,
      payload: room,
    });
    roomDataDispatch({ type: ROOM_DATA_ACTIONS.SET_ROOMS, payload: rooms });
    setLastOpenedRoom(room.name);

    handleDialogClose();
    console.log('Joined to room successfully.', room, rooms);
  };

  const roomUpdatedCallback = ({ error }) => {
    if (error) {
      return console.log('roomUpdatedCallback', error);
    }

    console.log('Room updated successfully.');
  };

  const leaveRoomCallback = ({ error, room }) => {
    if (error) {
      return console.log('leaveRoomCallback ERROR', error);
    }

    roomDataDispatch({ type: ROOM_DATA_ACTIONS.LEAVE_ROOM, payload: room });

    enqueueSnackbar(`You left ${room.name}.`, {
      variant: 'info',
      autoHideDuration: 2000,
    });

    console.log(`Left ${room.name} successfully.`);
  };

  const deleteRoomCallback = ({ error, room }) => {
    if (error) {
      console.log('handleDeleteRoomCallback', error);
    }

    enqueueSnackbar(`Room ${room.name} deleted.`, {
      variant: 'error',
      autoHideDuration: 2000,
    });

    console.log(`The room ${room.name} has been deleted.`);
  };

  // ##############################################

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

  const onNewUserData = React.useCallback(
    ({ rooms }) => {
      console.log('onNewUserData', rooms);
      roomDataDispatch({ type: ROOM_DATA_ACTIONS.SET_ROOMS, payload: rooms });
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

  const onNewMessage = React.useCallback(
    (message) => {
      roomDataDispatch({
        type: ROOM_DATA_ACTIONS.NEW_MESSAGE,
        payload: message,
      });
    },
    [roomDataDispatch]
  );

  const onRoomUpdated = React.useCallback(
    (room) => {
      console.log('onRoomUpdated', room);
      roomDataDispatch({ type: ROOM_DATA_ACTIONS.UPDATE_ROOM, payload: room });
    },
    [roomDataDispatch]
  );

  const onRoomDeleted = React.useCallback(
    (room) => {
      console.log('onRoomDeleted', room);
      roomDataDispatch({ type: ROOM_DATA_ACTIONS.ROOM_DELETED, payload: room });
    },
    [roomDataDispatch]
  );

  // ##############################################

  const roomUpdated = (oldName, newName) => {
    socket.roomUpdated(oldName, newName, roomUpdatedCallback);
  };

  const deleteRoom = (roomName) => {
    socket.deleteRoom(roomName, deleteRoomCallback);
  };

  console.log('ChatDashboard RE-RENDER');

  const handleCreateRoomClick = (dialogValue) => {
    socket.createRoom(user._id, dialogValue, createRoomCallback);
  };

  const handleJoinRoomClick = (dialogValue) => {
    socket.joinRoom(user._id, dialogValue, joinRoomCallback);
  };

  const handleLeaveClick = (roomName) => {
    socket.leaveRoom(user._id, roomName, leaveRoomCallback);
  };

  const handleRoomClick = (roomName) => {
    if (currentRoom && roomName === currentRoom.name) {
      return;
    }

    socket.joinRoom(user._id, roomName, joinRoomCallback);
  };

  const handleSubmit = (inputValue) => {
    socket.sendMessage(inputValue, currentRoom.name, user._id, submitCallback);
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
                  room={currentRoom}
                  isAuthor={currentRoom.author === user._id}
                  onLeaveClick={handleLeaveClick}
                  roomUpdated={roomUpdated}
                  deleteRoom={deleteRoom}
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

          // <React.Fragment>
          //   {/* <Grid item xs> */}
          //   {/* <Box className={classes.messages}> */}
          //   <CurrentRoomNullComponent />
          //   {/* </Box> */}
          //   {/* </Grid> */}
          // </React.Fragment>
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
