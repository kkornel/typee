import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function InteractiveNormalContainedButton(props) {
  const classes = useStyles();

  return (
    <Button
      className={classNames(
        classes.interactiveNormalContainedButton,
        props.cls
      )}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  interactiveNormalContainedButton: {
    color: theme.palette.interactiveHover,
    backgroundColor: theme.palette.interactiveMuted,
    '&:hover': {
      color: theme.palette.headerPrimary,
      backgroundColor: theme.palette.backgroundSecondary,
    },
  },
}));
