import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { deepPurple } from '@material-ui/core/colors';

// TODO: unique keys
export default function UserList({ users = [] }) {
  const classes = useStyles();
  const theme = mainTheme();

  return (
    <Box className={classNames(classes.usersList, theme.backgroundSecondary)}>
      {users.map((user) => {
        if (!user) {
          return;
        }
        console.log('UserList', user);
        const cls = user.online
          ? classes.usersListItem
          : classNames(classes.usersListItem, classes.red);

        return (
          // <Box className={classes.usersListItem} key={user._id}>
          <Box className={cls} key={user._id}>
            <Avatar className={classes.usersListItemAvatar}>
              {/* {user.name[0]}
              {user.name[1]} */}
              {user.username[0]}
              {user.username[1]}
            </Avatar>
            <Box className={classes.usersListItemInfo}>
              <Box className={classes.usersListItemTitle}>{user.username}</Box>
              <Box className={classes.usersListItemSubTitle}>
                {/* {user.subtitle} */}
                Lorem ipsum
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

const mainTheme = makeStyles((theme) => ({
  backgroundSecondary: {
    backgroundColor: '#2f3136',
  },
}));

const useStyles = makeStyles((theme) => ({
  red: {
    background: 'red',
  },
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
  usersListItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    width: '100%',
    '&:hover': {
      background: '#32353b',
      cursor: 'pointer',
    },
  },
  usersListItemAvatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  usersListItemInfo: {
    marginLeft: '10px',
  },
  usersListItemTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: '0',
  },
  usersListItemSubTitle: {
    fontSize: '14px',
    color: '#888',
    margin: '0',
  },
}));
