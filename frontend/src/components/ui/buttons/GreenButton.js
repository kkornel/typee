import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function GreenButton(props) {
  const classes = useStyles();

  return (
    <Button variant="contained" className={classes.greenButton} {...props} />
  );
}

const useStyles = makeStyles((theme) => ({
  greenButton: {
    color: theme.palette.headerPrimary,
    background: theme.palette.green,
    '&:hover': {
      background: theme.palette.greenAlt,
    },
  },
}));
