import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function RoomListDivider() {
  const classes = useStyles();

  return (
    <Box className={classes.divider1}>
      <Box className={classes.divider2}></Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  divider1: {
    position: 'relative',
    marginBottom: '4px',
    marginTop: '4px',
    display: 'flex',
    justifyContent: 'center',
    // width: '64px',
    width: '72px',
  },
  divider2: {
    // width: '32px',
    width: '36px',
    height: '2px',
    borderRadius: '1px',
    backgroundColor: '#2d2f32',
  },
}));
