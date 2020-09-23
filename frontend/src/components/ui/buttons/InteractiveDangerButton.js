import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function InteractiveDangerButton(props) {
  const classes = useStyles();

  return (
    <Button
      className={classNames(classes.interactiveDangerButton, props.classes)}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  interactiveDangerButton: {
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.headerPrimary,
      backgroundColor: theme.palette.red,
    },
  },
}));
