import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import HorizontalLineDivider from '../../ui/HorizontalLineDivider';

export default function HomeSectionHeader({ title }) {
  const classes = useStyles();

  return (
    <Box className={classes.homeHeader}>
      <Box component="span">{title}</Box>
      <HorizontalLineDivider style={{ marginLeft: '0', marginRight: '0' }} />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  homeHeader: {
    display: 'inline-block',
    marginTop: '16px',
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: theme.palette.headerPrimary,
  },
}));
