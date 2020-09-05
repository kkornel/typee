import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import HomeListItem from './HomeListItem';
import UserListHeader from '../user/UserListHeader';
import HorizontalLineDivider from '../../ui/HorizontalLineDivider';

import ForumIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

export default function CurrentRoomNullComponent() {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={2}>
        <Box className={classes.usersList}>
          <UserListHeader text={'Your profile'} />
          <HorizontalLineDivider />
          <HomeListItem icon={<ForumIcon />} text="Rooms" />
          <HomeListItem icon={<PeopleIcon />} text="Friends" />
          <HomeListItem icon={<SettingsIcon />} text="Settings" />
        </Box>
      </Grid>
      <Grid item xs>
        <Box className={classes.root}>
          <img
            src="https://thecoolhunter.net/wp-content/uploads/2018/12/TheSimpleLife_Original_900px.jpg"
            alt="Supposed to show very important data"
            width="450px"
            height="450px"
          />
        </Box>
      </Grid>
    </>
    // <Box className={classes.root}>
    //   <Box className={classes.imageBox}>
    //     <img
    //       src="https://thecoolhunter.net/wp-content/uploads/2018/12/TheSimpleLife_Original_900px.jpg"
    //       alt="Supposed to show very important data"
    //       width="450px"
    //       height="450px"
    //     />
    //     {/* <img src="https://ws.shoutcast.com/images/contacts/0/0f30/0f303352-f70c-4180-821e-7b0a61b3f11a/radios/46ad6e20-4e5e-4fc2-abdc-4e3d0491e8ca/46ad6e20-4e5e-4fc2-abdc-4e3d0491e8ca.png" /> */}
    //   </Box>
    // </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  messages: {
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    height: '100vh',
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0,
    outline: 0,
    overflow: 'hidden',
  },
  usersList: {
    position: 'relative',
    // maxHeight: 'calc(100vh - 64px) !important',
    height: '100vh',
    zIndex: '1',
    margin: '0',
    padding: '0',
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.scrollbarThinThumb} ${theme.palette.scrollbarThinTrack}`,
    background: theme.palette.backgroundSecondary,
  },
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
