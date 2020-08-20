import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default function RoomList({ rooms, handleRoomClick, handleAddClick }) {
  const classes = useStyles();
  // const theme = mainTheme();

  const onAddClick = () => {
    handleAddClick();
  };

  const onRoomIconClick = (event) => {
    handleRoomClick(event.target.offsetParent.value);
  };

  return (
    // <Box className={classNames(classes.roomList, theme.backgroundTertiary)}>
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

// const mainTheme = makeStyles((theme) => ({
//   backgroundTertiary: {
//     // backgroundColor: '#202225',
//   },
// }));

const useStyles = makeStyles((theme) => ({
  divider: {
    background: 'hsla(0,0%,100%,0.06)',
    height: '4px',
  },
  roomList: {
    // background: 'green',
    // background: '#202225',
    background: theme.palette.backgroundLight,
    maxHeight: 'calc(100vh - 64px) !important',
    overflowX: 'hidden',
    height: '100%',
    // width: '60px',
    // overflowY: 'scroll',
  },
  room: {},
  roomIcon: {
    // width: '48px',
    // height: '48px',
    // margin: '3px 3px 3px 3px',
    // background: 'white',
    // background: '#36393f',
    padding: '8px',
  },
  roomIconAvatar: {
    width: '48px',
    height: '48px',
    color: '#dcddde',
    background: theme.palette.backgroundDark,
    // margin: '3px 3px 3px 3px',
    '&:hover': {
      background: theme.palette.roomIconAvatarOnHover,
      color: '#fff',
    },
  },
  roomAddBox: {
    padding: '8px',
  },
  roomAddIcon: {
    width: '48px',
    height: '48px',
    // margin: '3px 3px 3px 3px',
    // background: 'white',
    background: theme.palette.backgroundDark,
    color: theme.palette.green,
    '&:hover': {
      background: theme.palette.green,
      color: '#fff',
    },
    // padding: 0,
    // margin: 0,
  },
}));
