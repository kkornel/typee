import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import InteractiveNormalContainedButton from '../../../ui/buttons/InteractiveNormalContainedButton';
import InteractiveDangerContainedButton from '../../../ui/buttons/InteractiveDangerContainedButton';

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
            <InteractiveNormalContainedButton
              onClick={() => onEditClick(room._id)}
              style={{
                height: '28px',
                padding: '0px',
                marginRight: '8px',
              }}
            >
              Edit
            </InteractiveNormalContainedButton>
            <InteractiveDangerContainedButton
              onClick={() => onDeleteClick(room._id)}
              style={{
                height: '28px',
                padding: '0px',
                marginRight: '8px',
              }}
            >
              Delete
            </InteractiveDangerContainedButton>
          </React.Fragment>
        ) : (
          <InteractiveNormalContainedButton
            onClick={() => onLeaveClick(room._id)}
            style={{
              height: '28px',
              padding: '0px',
              marginRight: '8px',
            }}
          >
            Leave
          </InteractiveNormalContainedButton>
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
    fontSize: '12px',
  },
  homeRoomItemName: {
    marginLeft: '12px',
  },
  homeRoomItemButtons: {
    marginLeft: '24px',
  },
}));
