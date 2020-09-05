import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import ArrowTooltip from '../../ui/ArrowTooltip';
import RoomListItemPill from './RoomListItemPill';

import { useRoomData } from '../../../context/RoomDataContext';

export default function RoomListItem({ room, handleRoomClick }) {
  const classes = useStyles();

  const [roomDataState] = useRoomData();

  const isCurrentRoom = roomDataState.currentRoom?._id === room._id;

  const onRoomIconClick = (event) => {
    if (event.target.tagName === 'IMG') {
      handleRoomClick(event.target.offsetParent.offsetParent.value);
    } else if (event.target.tagName === 'DIV') {
      handleRoomClick(event.target.offsetParent.value);
    }
  };

  return (
    <Box className={classes.room} key={room._id}>
      {isCurrentRoom && <RoomListItemPill />}
      <ArrowTooltip title={room.name}>
        <IconButton
          value={room.name}
          aria-label={room.name}
          className={classes.roomIcon}
          onClick={onRoomIconClick}
        >
          {room.avatarURL ? (
            <Avatar
              className={classes.roomIconAvatar}
              src={room.avatarURL}
            ></Avatar>
          ) : (
            <Avatar
              className={classNames(
                classes.roomIconAvatar,
                isCurrentRoom ? classes.roomIconAvatarCurrent : ''
              )}
            >
              {room.name[0]}
              {room.name[room.name.length - 1]}
            </Avatar>
          )}
        </IconButton>
      </ArrowTooltip>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  room: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    // width: '64px',
    width: '72px',
    // margin: '0 0 8px',
  },
  roomIcon: {
    // padding: '8px',
    // padding: '4px 8px 4px 8px',
    padding: '4px 12px 4px 12px',
  },
  roomIconAvatar: {
    width: '48px',
    height: '48px',
    color: theme.palette.textNormal,
    background: theme.palette.backgroundPrimary,
    '&:hover': {
      background: theme.palette.purple,
      color: theme.palette.headerPrimary,
    },
  },
  roomIconAvatarCurrent: {
    background: theme.palette.purple,
    color: theme.palette.headerPrimary,
  },
}));

// From Discord
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
