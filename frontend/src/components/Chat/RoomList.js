import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default function RoomList({ rooms, handleRoomClick, handleAddClick }) {
  const classes = useStyles();

  const onAddClick = () => {
    handleAddClick();
  };

  const onRoomIconClick = (event) => {
    handleRoomClick(event.target.offsetParent.value);
  };

  return (
    <Box className={classes.roomList}>
      {rooms.map(({ _id, name: roomName }) => {
        return (
          <Box className={classes.room} key={_id}>
            <Tooltip title={roomName}>
              <IconButton
                value={roomName}
                aria-label={roomName}
                className={classes.roomIcon}
                onClick={onRoomIconClick}
              >
                <Avatar className={classes.roomIconAvatar}>
                  {roomName[0]}
                  {roomName[roomName.length - 1]}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        );
      })}
      <Divider className={classes.divider} />
      <Box className={classes.roomAddBox}>
        <Tooltip title="Add channel">
          <IconButton
            aria-label="add"
            className={classes.roomAddIcon}
            onClick={onAddClick}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  divider: {
    background: 'hsla(0,0%,100%,0.06)',
    height: '4px',
  },
  roomList: {
    background: theme.palette.backgroundLight,
    maxHeight: 'calc(100vh - 64px) !important',
    overflowX: 'hidden',
    height: '100%',
  },
  room: {},
  roomIcon: {
    padding: '8px',
  },
  roomIconAvatar: {
    width: '48px',
    height: '48px',
    color: theme.palette.textNormal,
    background: theme.palette.backgroundDark,
    '&:hover': {
      background: theme.palette.roomIconAvatarOnHover,
      color: theme.palette.white,
    },
  },
  roomAddBox: {
    padding: '8px',
  },
  roomAddIcon: {
    width: '48px',
    height: '48px',
    background: theme.palette.backgroundDark,
    color: theme.palette.green,
    '&:hover': {
      background: theme.palette.green,
      color: theme.palette.white,
    },
  },
}));
