import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import ArrowTooltip from '../../ui/ArrowTooltip';

export default function RoomListAddIcon({ handleAddClick }) {
  const classes = useStyles();

  return (
    <Box className={classes.roomAddBox}>
      <ArrowTooltip title="Add channel">
        <IconButton
          aria-label="add"
          className={classes.roomAddIcon}
          onClick={handleAddClick}
        >
          <AddIcon />
        </IconButton>
      </ArrowTooltip>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  roomAddBox: {
    padding: '4px 12px 4px 12px',
  },
  roomAddIcon: {
    width: '48px',
    height: '48px',
    background: theme.palette.backgroundPrimary,
    color: theme.palette.green,
    '&:hover': {
      background: theme.palette.green,
      color: theme.palette.headerPrimary,
    },
  },
}));
