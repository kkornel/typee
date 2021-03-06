import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function OutlinedDangerButton(props) {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      className={classNames(classes.outlinedDangerButton, props.cls)}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  outlinedDangerButton: {
    color: theme.palette.red,
    borderColor: theme.palette.red,
    '&:hover': {
      backgroundColor: theme.palette.interactiveMuted,
    },
  },
}));
