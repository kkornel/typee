import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function InteractiveDangerContainedButton(props) {
  const classes = useStyles();

  return (
    <Button className={classes.interactiveDangerContainedButton} {...props} />
  );
}

const useStyles = makeStyles((theme) => ({
  interactiveDangerContainedButton: {
    color: theme.palette.interactiveHover,
    backgroundColor: theme.palette.redAlt,
    '&:hover': {
      color: theme.palette.headerPrimary,
      backgroundColor: 'red',
    },
  },
}));
