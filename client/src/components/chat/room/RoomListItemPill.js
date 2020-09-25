import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function RoomListItemPill() {
  const classes = useStyles();

  return (
    <Box className={classes.roomPill}>
      <Box className={classes.roomPillSpan} component="span"></Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  roomPill: {
    // position: 'relative',
    position: 'absolute',
    left: 0,
    // top: '8px',
    top: '4px',
    overflow: 'hidden',
    width: '8px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    contain: 'layout size',
  },
  roomPillSpan: {
    height: '40px',
    transform: 'none',
    position: 'absolute',
    display: 'block',
    width: '8px',
    borderRadius: '0 4px 4px 0',
    marginLeft: '-4px',
    backgroundColor: 'white',
  },
}));
