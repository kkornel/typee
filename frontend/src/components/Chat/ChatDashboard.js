import React from 'react';

import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import CurrentRoomNullComponent from './CurrentRoomNullComponent';
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

    console.log(`Left ${room.name} successfully.`);
  };

  const deleteRoomCallback = ({ error, room }) => {
    if (error) {
      console.log('handleDeleteRoomCallback', error);
    }

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
          {/* <Button onClick={socket.disconnet}>disconnet</Button> */}
        </Grid>
        {currentRoom ? (
          <React.Fragment>
            <Grid item xs={1}>
              <UserList users={currentRoom.users} />
            </Grid>
            <Grid item xs>
              <Box className={classes.messages}>
                <MessageAreaBar
                  room={currentRoom}
                  isAuthor={currentRoom.author === user._id}
                  onLeaveClick={handleLeaveClick}
                  roomUpdated={roomUpdated}
                  deleteRoom={deleteRoom}
                />
                <MessageArea messages={currentRoom.messages} />
                <MessageInput handleMessageSubmit={handleSubmit} />
              </Box>
            </Grid>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Grid item xs={1}></Grid> */}
            <Grid item xs>
              <Box className={classes.messages}>
                <CurrentRoomNullComponent />
              </Box>
            </Grid>
          </React.Fragment>
        )}
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
  rooms: {
    // width: '64px',
    width: '72px',
    // sadasdas
    height: 'calc(100vh - 64px) !important',
    // height: '100%',
    overflow: 'hidden',
  },
  messages: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100%',
    height: 'calc(100vh - 64px) !important',
  },
}));
