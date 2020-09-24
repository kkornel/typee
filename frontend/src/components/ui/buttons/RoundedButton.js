import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function RoundedButton(props) {
  const classes = useStyles();

  return <Box className={classNames(classes.button, props.cls)} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'inline-flex',
    alignItems: 'baseline',
    padding: '16px 32px',
    borderRadius: '28px',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    cursor: 'pointer',
    textDecoration: 'none',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: '.2s',
    transitionProperty: 'background-color,color,box-shadow,-webkit-box-shadow',
  },
}));
