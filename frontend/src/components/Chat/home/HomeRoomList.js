import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { useAuth } from '../../../context/AuthContext';

import EditRoomDialog from './EditRoomDialog';

import HomeRoomListItem from './HomeRoomListItem';
import HomeRoomListHeader from './HomeRoomListHeader';

import {
  useRoomData,
  ACTIONS as ROOM_DATA_ACTIONS,
} from '../../../context/RoomDataContext';

export default function HomeRoomList({ socket }) {
  const classes = useStyles();

  const [roomDataState, roomDataDispatch] = useRoomData();
  const { user } = useAuth();

  const [dialogData, setDialogData] = React.useState({
    open: false,
    error: null,
    room: null,
  });

  const managedRooms = Object.values(roomDataState.rooms).filter(
    (room) => room.author === user._id
  );

  const participatedRooms = Object.values(roomDataState.rooms).filter(
    (room) => room.author !== user._id
  );

  React.useEffect(() => {
    console.log('useEffect', socket);
    if (!socket) return;
    socket.onRoomUpdated(onRoomUpdated);
    socket.onRoomDeleted(onRoomDeleted);
  }, []);

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

  const onDialogClose = () => {
    setDialogData({ open: false });
  };

  const onSaveClick = () => {};

  const onEditClick = (roomId) => {
    console.log(roomDataState.rooms[roomId]);
    setDialogData({ open: true, room: roomDataState.rooms[roomId] });
  };
  const onDeleteClick = (roomId) => {
    console.log(roomId);
  };
  const onLeaveClick = (roomId) => {
    console.log(roomId);
  };

  return (
    <Box className={classes.homeRoomList}>
      <HomeRoomListHeader title={'Rooms you manage'} />
      {managedRooms.map((room) => (
        <HomeRoomListItem
          room={room}
          key={room._id}
          isAuthor={true}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
      <HomeRoomListHeader title={'Rooms you participate'} />
      {participatedRooms.map((room) => (
        <HomeRoomListItem
          room={room}
          key={room._id}
          isAuthor={false}
          onLeaveClick={onLeaveClick}
        />
      ))}
      <EditRoomDialog
        dialogData={dialogData}
        onDialogClose={onDialogClose}
        onSaveClick={onSaveClick}
      />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  homeRoomList: {
    background: theme.palette.backgroundPrimary,
    height: '100vh',
    padding: '0 16px',
  },
}));
