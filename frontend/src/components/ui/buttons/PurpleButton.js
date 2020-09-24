import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function PurpleButton(props) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classNames(classes.purpleButton, props.cls)}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  purpleButton: {
    textTransform: 'none',
    color: theme.palette.headerPrimary,
    background: theme.palette.purple,
    '&:hover': {
      background: theme.palette.purpleAlt,
    },
  },
}));
