import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function InteractiveNormalButton(props) {
  const classes = useStyles();

  return (
    <Button
      className={classNames(classes.interactiveNormalButton, props.classes)}
      {...props}
    />
  );
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
