import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function InteractiveDangerContainedButton(props) {
  const classes = useStyles();

  return (
    <Button
      className={classNames(
        classes.interactiveDangerContainedButton,
        props.classes
      )}
      {...props}
    />
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
