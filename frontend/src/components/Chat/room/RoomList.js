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
    // maxHeight: 'calc(100vh - 64px) !important',
    paddingTop: '12px',

    height: '100vh',
    overflowX: 'hidden',
    // minWidth: '64px',
    // asdasda
    width: '100%',
    overflowY: 'scroll',
    paddingRight:
      '17px' /* Increase/decrease this value for cross-browser compatibility */,
    boxSizing: 'content-box' /* So the width will be 100% + 17px */,
  },
}));

// My old RoomList
// const useStyles = makeStyles((theme) => ({
//   divider: {
//     background: 'hsla(0,0%,100%,0.06)',
//     height: '4px',
//   },
//   roomList: {
//     background: theme.palette.backgroundTertiary,
//     maxHeight: 'calc(100vh - 64px) !important',
//     overflowX: 'hidden',
//     height: '100%',
//     // minWidth: '64px',
//     // asdasda
//     width: '100%',
//     overflowY: 'scroll',
//     paddingRight:
//       '17px' /* Increase/decrease this value for cross-browser compatibility */,
//     boxSizing: 'content-box' /* So the width will be 100% + 17px */,
//     // sadasdas
//     position: 'relative',
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   roomPill: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     overflow: 'hidden',
//     width: '8px',
//     height: '48px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     contain: 'layout size',
//   },
//   roomPillSpan: {
//     height: '40px',
//     transform: 'none',
//     position: 'absolute',
//     display: 'block',
//     width: '8px',
//     borderRadius: '0 4px 4px 0',
//     marginLeft: '-4px',
//     backgroundColor: 'white',
//   },
//   roomContainer: {
//     boxSizing: 'border-box',
//     width: '48px',
//     height: '48px',
//     position: 'relative',
//   },
//   room: {
//     position: 'relative',
//     display: 'flex',
//     justifyContent: 'center',
//     width: '72px',
//     margin: '0 0 8px',
//   },
//   roomIcon: {
//     padding: '8px',
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     boxSizing: 'border-box',
//     width: '48px',
//     height: '48px',
//   },
//   roomIconAvatar: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '48px',
//     height: '48px',
//     color: theme.palette.textNormal,
//     background: theme.palette.backgroundPrimary,
//     '&:hover': {
//       background: theme.palette.purple,
//       color: theme.palette.headerPrimary,
//     },
//   },
//   roomAddBox: {
//     padding: '8px',
//   },
//   roomAddIcon: {
//     width: '48px',
//     height: '48px',
//     background: theme.palette.backgroundPrimary,
//     color: theme.palette.green,
//     '&:hover': {
//       background: theme.palette.green,
//       color: theme.palette.headerPrimary,
//     },
//   },
// }));
