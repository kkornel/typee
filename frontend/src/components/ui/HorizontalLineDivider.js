import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function HorizontalLineDivider(props) {
  const classes = useStyles(props);

  return <Box className={classes.container} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2px',
    marginBottom: '4px',
    overflow: 'hidden',
    marginLeft: '16px',
    marginRight: '14px',
    background: theme.palette.backgroundAccent,
    content: '""',
    display: 'block',
    height: '1px',
    position: 'relative',
    verticalAlign: 'middle',
    maxWidth: '100%',
  },
}));
