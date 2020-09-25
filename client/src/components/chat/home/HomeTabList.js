import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ForumIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import HomeListItem from './HomeListItem';
import UserListHeader from '../user/UserListHeader';
import HorizontalLineDivider from '../../ui/HorizontalLineDivider';

export default function HomeTabList({ selectedTab, setSelectedTab }) {
  const classes = useStyles();

  return (
    <Box className={classes.homeList}>
      <UserListHeader text={'Your profile'} />
      <HorizontalLineDivider />
      <HomeListItem
        icon={<ForumIcon />}
        text="Rooms"
        onClick={() => setSelectedTab('rooms')}
        selected={selectedTab === 'rooms'}
      />
      <HomeListItem
        icon={<PeopleIcon />}
        text="Friends"
        onClick={() => setSelectedTab('friends')}
        selected={selectedTab === 'friends'}
      />
      <HomeListItem
        icon={<SettingsIcon />}
        text="Settings"
        onClick={() => setSelectedTab('settings')}
        selected={selectedTab === 'settings'}
      />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  homeList: {
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
}));
