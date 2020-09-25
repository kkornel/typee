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
          <Avatar
            src={room.avatarUrl}
            className={classNames(
              classes.roomIconAvatar,
              isCurrentRoom ? classes.roomIconAvatarCurrent : ''
            )}
          >
            {room.name[0]}
            {room.name[room.name.length - 1]}
          </Avatar>
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
    width: '72px',
  },
  roomIcon: {
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
