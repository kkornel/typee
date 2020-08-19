import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import UserListItem from './UserListItem';
import TextDivider from './TextDivider';

export default function UserList({ users }) {
  const classes = useStyles();
  const theme = mainTheme();

  const online = users.filter((user) => user.online === true);
  const offline = users.filter((user) => user.online === false);

  return (
    <Box className={classNames(classes.usersList, theme.backgroundSecondary)}>
      {online.map((user) => (
        <UserListItem user={user} key={user._id} />
      ))}
      {/* <Divider variant="middle" /> */}
      <TextDivider>Offline</TextDivider>
      {/* <Divider variant="middle" /> */}
      {online.map((user) => (
        <UserListItem user={user} key={user._id} />
      ))}
    </Box>
  );
}

const mainTheme = makeStyles((theme) => ({
  backgroundSecondary: {
    backgroundColor: '#2f3136',
  },
}));

const useStyles = makeStyles((theme) => ({
  usersList: {
    // background: 'purple',
    // background: '#2f3136',
    maxHeight: 'calc(100vh - 64px) !important',
    // width: '90px',
    overflowX: 'hidden',
    // overflow: 'auto',
    height: '100%',
    overflowY: 'auto',
    // overflowY: 'scroll',
    zIndex: '1',
    position: 'relative',
  },
}));
