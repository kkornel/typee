import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function InteractiveNormalButton(props) {
  const classes = useStyles();

  return <Button className={classes.interactiveNormalButton} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  interactiveNormalButton: {
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.interactiveHover,
      backgroundColor: theme.palette.interactiveMuted,
    },
  },
}));
