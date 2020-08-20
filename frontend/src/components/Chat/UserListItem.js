import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { deepPurple } from '@material-ui/core/colors';

export default function UserListItem({ user }) {
  const classes = useStyles();

  return (
    <Box
      className={
        user.online
          ? classes.usersListItem
          : classNames(classes.usersListItem, classes.red)
      }
      key={user._id}
    >
      <Avatar className={classes.usersListItemAvatar}>
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
}

const useStyles = makeStyles((theme) => ({
  red: {
    background: 'red',
  },
  usersListItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    width: '100%',
    '&:hover': {
      background: theme.palette.usersListItemOnHover,
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
    color: theme.palette.usersListItemSubTitle,
    margin: '0',
  },
}));
