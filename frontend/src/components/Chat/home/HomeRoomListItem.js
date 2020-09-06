import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function HomeRoomListItem({
  room,
  onEditClick,
  onDeleteClick,
  onLeaveClick,
  isAuthor,
}) {
  const classes = useStyles();

  return (
    <Box className={classes.homeRoomItem}>
      <Box className={classes.homeRoomItemContent}>
        <Box className={classes.homeRoomItemAvatar}>
          {room.avatarURL ? (
            <Avatar className={classes.roomIconAvatar} src={room.avatarURL} />
          ) : (
            <Avatar className={classes.roomIconAvatar}>
              {room.name[0]}
              {room.name[room.name.length - 1]}
            </Avatar>
          )}
        </Box>
        <Box className={classes.homeRoomItemName}>{room.name}</Box>
      </Box>
      <Box className={classes.homeRoomItemButtons}>
        {isAuthor ? (
          <React.Fragment>
            <Button
              className={classes.interactiveNormalButton}
              onClick={() => onEditClick(room._id)}
            >
              EDIT
            </Button>
            <Button
              className={classes.homeRoomItemButtonDelete}
              onClick={() => onDeleteClick(room._id)}
            >
              DELETE
            </Button>
          </React.Fragment>
        ) : (
          <Button
            className={classes.interactiveNormalButton}
            onClick={() => onLeaveClick(room._id)}
          >
            LEAVE
          </Button>
        )}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  homeRoomItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4px 0',
    border: `1px solid ${theme.palette.backgroundAccent}`,
    borderRadius: '10px',
    marginTop: '8px',
    maxWidth: '480px',
    justifyContent: 'space-between',
  },
  homeRoomItemContent: {
    display: 'flex',
    alignItems: 'center',
  },
  homeRoomItemAvatar: {
    marginLeft: '8px',
    // marginRight: '8px',
    fontSize: '12px',
  },
  roomIconAvatar: {
    // width: '32px',
    // height: '32px',
    // fontSize: '16px',
  },
  homeRoomItemName: {
    marginLeft: '12px',
  },
  homeRoomItemButtons: {
    marginLeft: '24px',
  },
  interactiveNormalButton: {
    width: '16px',
    height: '28px',
    padding: '0px',
    color: theme.palette.interactiveHover,
    backgroundColor: theme.palette.interactiveMuted,
    // color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.interactiveHover,
      // backgroundColor: theme.palette.interactiveMuted,
      backgroundColor: theme.palette.backgroundSecondary,
    },
    marginRight: '8px',
  },
  homeRoomItemButtonDelete: {
    width: '42px',
    height: '28px',
    padding: '8px',
    marginRight: '8px',
    // color: theme.palette.interactiveHover,
    color: theme.palette.textNormal,
    // backgroundColor: theme.palette.interactiveMuted,
    backgroundColor: '#C7312F',
    '&:hover': {
      color: theme.palette.headerPrimary,
      backgroundColor: theme.palette.red,
    },
  },
}));
