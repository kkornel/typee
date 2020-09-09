import React from 'react';

import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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

  const { enqueueSnackbar } = useSnackbar();

  const [dialogData, setDialogData] = React.useState({
    open: false,
    roomId: null,
  });

  const managedRooms = Object.values(roomDataState.rooms).filter(
    (room) => room.author._id === user._id
  );

  const participatedRooms = Object.values(roomDataState.rooms).filter(
    (room) => room.author._id !== user._id
  );

  const onDialogClose = () => {
    setDialogData({ open: false, roomId: null });
  };

  const onSuccessfulUpdate = () => {
    setDialogData({ open: false });
    enqueueSnackbar(`Room updated.`, {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  const onEditClick = (roomId) => {
    console.log(roomId);
    setDialogData({
      open: true,
      roomId: roomId,
    });
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
      {dialogData.roomId && (
        <EditRoomDialog
          socket={socket}
          dialogData={dialogData}
          onDialogClose={onDialogClose}
          onSuccessfulUpdate={onSuccessfulUpdate}
        />
      )}
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
