import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function HorizontalTextDivider(props) {
  const classes = useStyles(props);

  return <Box className={classes.container} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '16px',
    overflow: 'hidden',
    textAlign: 'center',
    marginLeft: '16px',
    marginRight: '14px',
    padding: '2px 0',
    color: theme.palette.textMuted,
    lineHeight: '13px',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'Roboto',
    letterSpacing: '0.5px',
    '&::before': {
      background: theme.palette.backgroundAccent,
      content: '""',
      display: 'inline-block',
      height: '1px',
      position: 'relative',
      verticalAlign: 'middle',
      width: '50%',
      right: '8px',
      marginLeft: '-50%;',
    },
    '&::after': {
      background: theme.palette.backgroundAccent,
      content: '""',
      display: 'inline-block',
      height: '1px',
      position: 'relative',
      verticalAlign: 'middle',
      width: '50%',
      left: '8px',
      marginRight: '-50%;',
    },
  },
}));
