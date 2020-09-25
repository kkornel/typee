import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import RoomListItem from './RoomListItem';
import RoomListDivider from './RoomListDivider';
import RoomListAddIcon from './RoomListAddIcon';
import RoomListHomeIcon from './RoomListHomeIcon';

export default function RoomList({
  rooms,
  handleHomeClick,
  handleRoomClick,
  handleAddClick,
}) {
  const classes = useStyles();

  return (
    <Box className={classes.roomList}>
      <RoomListHomeIcon handleHomeClick={handleHomeClick} />
      <RoomListDivider />
      {Object.values(rooms).map((room) => (
        <RoomListItem
          room={room}
          handleRoomClick={handleRoomClick}
          key={room._id}
        />
      ))}
      <RoomListDivider />
      <RoomListAddIcon handleAddClick={handleAddClick} />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  roomList: {
    background: theme.palette.backgroundTertiary,
    paddingTop: '12px',
    height: '100vh',
    overflowX: 'hidden',
    width: '100%',
    overflowY: 'scroll',
    paddingRight: '17px',
    boxSizing: 'content-box' /* So the width will be 100% + 17px */,
  },
}));
