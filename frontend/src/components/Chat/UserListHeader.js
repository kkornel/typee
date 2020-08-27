import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function UserListHeader({ text }) {
  const classes = useStyles();

  return (
    <h2
      className={classNames(classes.usersListHeader, classes.contentOverflow)}
    >
      <Box
        className={classNames(
          classes.usersListHeaderSpan,
          classes.contentOverflow
        )}
        component="span"
      >
        {text}
      </Box>
    </h2>
  );
}

const useStyles = makeStyles((theme) => ({
  usersListHeader: {
    padding: '24px 8px 0 16px',
    height: '40px',
    textTransform: 'uppercase',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '600',
    margin: '0',
    boxSizing: 'border-box',
  },
  usersListHeaderSpan: {
    margin: '0',
    padding: '0',
    outline: '0',
    fontFamily: 'Roboto',
    color: theme.palette.channelsDefault,
  },
  contentOverflow: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: theme.palette.channelsDefault,
  },
}));
