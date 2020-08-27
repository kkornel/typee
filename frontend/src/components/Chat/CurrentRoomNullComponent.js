import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function CurrentRoomNullComponent() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.imageBox}>
        <img
          src="https://thecoolhunter.net/wp-content/uploads/2018/12/TheSimpleLife_Original_900px.jpg"
          alt="Supposed to show very important data"
          width="450px"
          height="450px"
        />
        {/* <img src="https://ws.shoutcast.com/images/contacts/0/0f30/0f303352-f70c-4180-821e-7b0a61b3f11a/radios/46ad6e20-4e5e-4fc2-abdc-4e3d0491e8ca/46ad6e20-4e5e-4fc2-abdc-4e3d0491e8ca.png" /> */}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.backgroundPrimary,
    width: '100%',
    height: '100%',
  },
  imageBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
  },
}));
