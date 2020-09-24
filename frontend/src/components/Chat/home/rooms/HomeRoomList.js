import React from 'react';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import HomeSectionHeader from '../HomeSectionHeader';
import HomeRoomListItem from './HomeRoomListItem';

import EditRoomDialog from '../../../ui/dialogs/EditRoomDialog';
import DeleteRoomDialog from '../../../ui/dialogs/DeleteRoomDialog';
import ConfirmationDialog from '../../../ui/dialogs/ConfirmationDialog';

import { useRoomData } from '../../../../context/RoomDataContext';
import { LEAVE_ROOM } from '../../../../context/actions/roomData';
import { useAuth } from '../../../../context/AuthContext';
import { useUserData } from '../../../../context/UserDataContext';

export default function HomeRoomList({ socket }) {
  const classes = useStyles();

  const { user } = useAuth();
  const { handleRoomDeleted } = useUserData();
  const [roomDataState, roomDataDispatch] = useRoomData();

  const { enqueueSnackbar } = useSnackbar();

  const managedRooms = Object.values(roomDataState.rooms).filter(
    (room) => room.author._id === user._id
  );

  const participatedRooms = Object.values(roomDataState.rooms).filter(
    (room) => room.author._id !== user._id
  );

  const [dialogData, setDialogData] = React.useState({
    openEdit: false,
    openDelete: false,
    roomId: null,
  });

  const [confirmationDialogData, setConfirmationDialogData] = React.useState({
    open: false,
    title: 'Leave conversation?',
    content:
      'You will stop receiving messages from this room and people will see that you left.',
    cancelButtonText: 'Close',
    confirmButtonText: 'Leave',
    data: null,
  });

  const onDialogConfirm = () => {
    socket.leaveRoom(user._id, confirmationDialogData.data, leaveRoomCallback);

    setConfirmationDialogData({
      ...confirmationDialogData,
      open: false,
      data: null,
    });
  };

  const onDialogCancel = () => {
    setConfirmationDialogData({
      ...confirmationDialogData,
      open: false,
      data: null,
    });
  };

  const leaveRoomCallback = ({ error, room }) => {
    if (error) {
      return console.log('leaveRoomCallback ERROR', error);
    }

    roomDataDispatch({ type: LEAVE_ROOM, payload: room });
    handleRoomDeleted(room.name);

    enqueueSnackbar(`You left ${room.name}`, {
      variant: 'info',
      autoHideDuration: 2000,
    });

    console.log(`Left ${room.name} successfully.`);
  };

  const onDialogClose = () => {
    setDialogData({
      openEdit: false,
      openDelete: false,
      roomId: null,
    });
  };

  const onSuccessfulUpdate = () => {
    onDialogClose();
    enqueueSnackbar(`Room updated`, {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  const onSuccessfulDelete = (room) => {
    onDialogClose();
    enqueueSnackbar(`Room ${room.name} deleted`, {
      variant: 'error',
      autoHideDuration: 2000,
    });
  };

  const onEditClick = (roomId) => {
    setDialogData({
      openEdit: true,
      roomId: roomId,
    });
  };

  const onDeleteClick = (roomId) => {
    setDialogData({
      openDelete: true,
      roomId: roomId,
    });
  };

  const onLeaveClick = (room) => {
    console.log('onLeaveClick', room);
    setConfirmationDialogData({
      ...confirmationDialogData,
      open: true,
      data: room,
    });
  };

  return (
    <Box className={classes.homeRoomList}>
      <HomeSectionHeader title={'Rooms you manage'} />
      {managedRooms.map((room) => (
        <HomeRoomListItem
          room={room}
          key={room._id}
          isAuthor={true}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
      <HomeSectionHeader title={'Rooms you participate'} />
      {participatedRooms.map((room) => (
        <HomeRoomListItem
          room={room}
          key={room._id}
          isAuthor={false}
          onLeaveClick={onLeaveClick}
        />
      ))}
      {dialogData.roomId && dialogData.openEdit && (
        <EditRoomDialog
          socket={socket}
          dialogData={dialogData}
          onDialogClose={onDialogClose}
          onSuccessfulUpdate={onSuccessfulUpdate}
        />
      )}
      {dialogData.roomId && dialogData.openDelete && (
        <DeleteRoomDialog
          socket={socket}
          dialogData={dialogData}
          onDialogClose={onDialogClose}
          onSuccessfulDelete={onSuccessfulDelete}
        />
      )}
      {confirmationDialogData.open && (
        <ConfirmationDialog
          dialogData={confirmationDialogData}
          onDialogConfirm={onDialogConfirm}
          onDialogCancel={onDialogCancel}
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
