import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { useRoomData } from '../../../context/RoomDataContext';
import { useAuth } from '../../../context/AuthContext';

import HomeTabList from './HomeTabList';
import HomeRoomListItem from './HomeRoomListItem';
import HomeRoomListHeader from './HomeRoomListHeader';

export default function HomeSettings() {
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
    <React.Fragment>
      <Grid item xs={2}>
        <HomeTabList setSelectedTab={setSelectedTab} />
      </Grid>
      <Grid item xs>
        {renderContent()}
        <Box className={classes.homeRoomList}></Box>
      </Grid>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  homeRoomList: {
    background: theme.palette.backgroundPrimary,
    height: '100vh',
    padding: '0 16px',
  },
  homeHeader: {
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: '14px',
    color: theme.palette.headerPrimary,
    display: 'inline-block',
  },
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
    marginLeft: '8px',
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
