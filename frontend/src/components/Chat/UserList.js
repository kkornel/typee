import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import UserListItem from './UserListItem';
import UserListHeader from './UserListHeader';

// usersListHeader
// usersListHeaderSpan
// usersListItemContent
// usersListItemContentNameInner
// usersListItemContentNameInnerSpan
// usersListItemContentSubtext
// usersListItemContentNameInnerDiv

export default function UserList({ users }) {
  const classes = useStyles();

  const online = users.filter((user) => user.online === true);
  const offline = users.filter((user) => user.online === false);

  return (
    <Box className={classes.usersList}>
      <UserListHeader text={`Online-${online.length}`} />
      {online.map((user) => (
        <UserListItem user={user} key={user._id} />
      ))}
      {online.map((user) => (
        <UserListItem user={user} key={user._id} />
      ))}
      {online.map((user) => (
        <UserListItem user={user} key={user._id} />
      ))}
      <UserListHeader text={`Offline-${offline.length}`} />
      {offline.map((user) => (
        <UserListItem user={user} key={user._id} />
      ))}
      {offline.map((user) => (
        <UserListItem user={user} key={user._id} />
      ))}
      {offline.map((user) => (
        <UserListItem user={user} key={user._id} />
      ))}
    </Box>
  );
}
const useStyles = makeStyles((theme) => ({
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
}));
