import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

export default function ArrowTooltip(props) {
  const classesSmall = useStylesBootstrapSmall();
  const classesNormal = useStylesBootstrapNormal();

  return (
    <Tooltip
      arrow
      cls={props.small ? classesSmall : classesNormal}
      placement={props.placement ? props.placement : 'right'}
      TransitionComponent={Zoom}
      {...props}
    />
  );
}

const useStylesBootstrapNormal = makeStyles((theme) => ({
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

const useStylesBootstrapSmall = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.headerPrimary,
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}));
