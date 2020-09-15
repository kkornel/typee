import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function RedDarkButton(props) {
  const classes = useStyles();

  return <Button className={classes.redDarkButton} {...props} />;
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
