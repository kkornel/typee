import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
// import ExploreIcon from '@material-ui/icons/Explore';
// import FingerprintIcon from '@material-ui/icons/Fingerprint';
import IconButton from '@material-ui/core/IconButton';
// import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

import ArrowTooltip from '../../ui/ArrowTooltip';

import { useRoomData } from '../../../context/RoomDataContext';

export default function RoomListHomeIcon({ handleHomeClick }) {
  const classes = useStyles();

  const [roomDataState] = useRoomData();
  const isCurrentRoom = roomDataState.currentRoom;

  return (
    <Box className={classes.roomHomeBox}>
      <ArrowTooltip title="Home">
        <IconButton
          aria-label="home"
          className={classNames(
            classes.roomHomeIcon,
            !isCurrentRoom ? classes.roomHomeIconCurrent : ''
          )}
          onClick={handleHomeClick}
        >
          <DashboardIcon />
          {/* <EmojiFoodBeverageIcon /> */}
          {/* <ExploreIcon /> */}
          {/* <FingerprintIcon /> */}
          {/* <SportsEsportsIcon /> */}
        </IconButton>
      </ArrowTooltip>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  roomHomeBox: {
    // padding: '4px 8px 4px 8px',
    padding: '4px 12px 4px 12px',
  },
  roomHomeIcon: {
    width: '48px',
    height: '48px',
    color: theme.palette.textNormal,
    background: theme.palette.backgroundPrimary,
    '&:hover': {
      background: theme.palette.purple,
      color: theme.palette.headerPrimary,
    },
  },
  roomHomeIconCurrent: {
    background: theme.palette.purple,
    color: theme.palette.headerPrimary,
  },
}));
