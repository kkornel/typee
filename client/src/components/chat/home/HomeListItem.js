import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import ArrowTooltip from '../../ui/ArrowTooltip';
import Box from '@material-ui/core/Box';

export default function HomeListItem({ icon, text, onClick, selected }) {
  const classes = useStyles();

  const listItemClass = selected ? classes.selected : '';

  return (
    <Box
      className={classNames(classes.listItem, listItemClass)}
      onClick={onClick}
    >
      <Box className={classes.listItemInner}>
        <Box className={classes.listItemAvatar}>
          <ArrowTooltip title={text}>
            <Box className={classes.listItemIcon}>{icon}</Box>
          </ArrowTooltip>
        </Box>
        <Box
          className={classNames(
            classes.listItemContent,
            classes.contentOverflow
          )}
        >
          <Box className={classes.listItemContentInner}>
            <Box
              className={classNames(
                classes.listItemContentName,
                classes.contentOverflow
              )}
            >
              {text}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    position: 'relative',
    display: 'block',
    maxWidth: '100%',
    margin: '4px 14px',
    padding: '1px 0',
    outline: '0',
    // width: '100%',
    borderRadius: '4px',
    boxSizing: 'border-box',
    color: theme.palette.channelsDefault,
    '&:hover': {
      background: theme.palette.interactiveMuted,
      color: theme.palette.interactiveHover,
      cursor: 'pointer',
    },
  },
  selected: {
    background: theme.palette.interactiveMuted,
    color: theme.palette.interactiveHover,
  },
  listItemInner: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    padding: '0 8px',
    margin: '0',
    outline: '0',
    borderRadius: '4px',
  },
  listItemAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto',
    width: '32px',
    height: '32px',
    marginRight: '12px',
    outline: '0',
  },
  listItemIcon: {
    position: 'relative',
    width: '24px',
    height: '24px',
    outline: '0',
    borderRadius: '50%',
  },
  listItemContent: {
    flex: '1 1 auto',
    minWidth: '0',
  },
  listItemContentInner: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    outline: '0',
  },
  listItemContentName: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 500,
    flex: '0 1 auto',
  },
  contentOverflow: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
