import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

export default function RoundedLinkButton(props) {
  const classes = useStyles();

  return (
    <Link className={classNames(classes.button, props.classes)} {...props} />
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'inline-flex',
    alignItems: 'center',
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
