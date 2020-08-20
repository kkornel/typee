import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

export default function TextDivider(props) {
  const classes = useStyles();

  return (
    <div className={classes.container} style={{ ...props.style }}>
      <div className={classes.border} />
      <span className={classes.content}>{props.children}</span>
      <div className={classes.border} />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px 0 10px',
  },
  border: {
    borderBottom: `1px solid ${theme.palette.textDividerBorderBottom}`,
    width: '100%',
  },
  content: {
    padding: '0 4px 0 4px',
    fontSize: '12px',
    color: theme.palette.usersListItemSubTitle,
  },
}));
