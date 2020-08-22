import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import UserListItem from './UserListItem';
import TextDivider from './TextDivider';

export default function UserList({ users }) {
  const classes = useStyles();

  const online = users.filter((user) => user.online === true);
  const offline = users.filter((user) => user.online === false);

  return (
    <Box className={classes.usersList}>
      {online.map((user) => (
        <UserListItem user={user} key={user._id} />
      ))}
      <TextDivider>Offline</TextDivider>
      {online.map((user) => (
        <UserListItem user={user} key={user._id} />
      ))}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  usersList: {
    background: theme.palette.backgroundSecondary,
    maxHeight: 'calc(100vh - 64px) !important',
    overflowX: 'hidden',
    height: '100%',
    overflowY: 'auto',
    zIndex: '1',
    position: 'relative',
  },
}));
