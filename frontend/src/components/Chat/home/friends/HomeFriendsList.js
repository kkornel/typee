import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import HomeTabList from '../HomeTabList';

import { useAuth } from '../../../../context/AuthContext';
import { useRoomData } from '../../../../context/RoomDataContext';

export default function HomeFriendsList() {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = React.useState('rooms');

  const [roomDataState, roomDataDispatch] = useRoomData();
  const { user } = useAuth();

  const managedRooms = Object.values(roomDataState.rooms).filter(
    (room) => room.author === user._id
  );

  const participatedRooms = Object.values(roomDataState.rooms).filter(
    (room) => room.author !== user._id
  );

  const renderContent = () => {};

  return (
    <Box className={classes.homeFriendsList}>
      <Box className={classes.content}>
        <h1 className={classes.header}>
          <Box component="span" className={classes.span1}>
            //
          </Box>
          <Box component="span" className={classes.span2}>
            SOON
          </Box>
        </h1>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  homeFriendsList: {
    background: theme.palette.backgroundPrimary,
    height: '100vh',
    padding: '0 16px',
  },
  content: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    textAlign: 'center',
    paddingTop: '64px',
  },
  header: {
    padding: 0,
    margin: 0,
    fontFamily: 'Roboto',
    fontWeight: 900,
    fontSize: '98px',
  },
  span1: {
    color: theme.palette.textMuted,
  },
  span2: {
    color: theme.palette.headerPrimary,
    fontStyle: 'italic',
  },
}));
