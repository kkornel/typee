import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default function ({ rooms = [], handleRoomClick, handleAddClick }) {
  const classes = useStyles();
  const theme = mainTheme();

  const onAddClick = () => {
    handleAddClick();
  };

  const onRoomIconClick = (event) => {
    handleRoomClick(event.target.offsetParent.value);
  };

  console.log('&&& RoomList RE-RENDER');

  return (
    <Box className={classNames(classes.roomList, theme.backgroundTertiary)}>
      {rooms.map((roomName) => {
        return (
          <Box className={classes.room} key={roomName}>
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

const mainTheme = makeStyles((theme) => ({
  backgroundTertiary: {
    backgroundColor: '#202225',
  },
}));

const useStyles = makeStyles((theme) => ({
  divider: {
    background: 'hsla(0,0%,100%,0.06)',
    height: '4px',
  },
  roomList: {
    // background: 'green',
    // background: '#202225',

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
    backgroundColor: '#36393f',
    // margin: '3px 3px 3px 3px',
    '&:hover': {
      backgroundColor: '#7289da',
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
    background: '#36393f',
    color: '#43b581',
    '&:hover': {
      background: '#43b581',
      color: '#fff',
    },
    // padding: 0,
    // margin: 0,
  },
}));
