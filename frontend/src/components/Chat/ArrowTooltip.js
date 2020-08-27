import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

export default function ArrowTooltip(props) {
  const classes = useStylesBootstrap();

  return (
    <Tooltip
      arrow
      classes={classes}
      placement="right"
      TransitionComponent={Zoom}
      {...props}
    />
  );
}

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.headerPrimary,
    boxShadow: theme.shadows[1],
    fontSize: 16,
    fontWeight: 'bold',
  },
}));
