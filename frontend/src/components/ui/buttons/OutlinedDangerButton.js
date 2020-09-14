import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function OutlinedDangerButton(props) {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      className={classes.outlinedDangerButton}
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
