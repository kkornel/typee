import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function RedDarkButton(props) {
  const classes = useStyles();

  return (
    <Button
      className={classNames(classes.redDarkButton, props.cls)}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  redDarkButton: {
    color: theme.palette.red,
    backgroundColor: theme.palette.redDark,
    '&:hover': {
      color: theme.palette.headerPrimary,
      backgroundColor: theme.palette.red,
    },
  },
}));
