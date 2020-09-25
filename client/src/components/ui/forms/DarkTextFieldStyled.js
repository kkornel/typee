import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import DarkTextField from './DarkTextField';

export default function DarkTextFieldStyled(props) {
  const classes = useStyles();

  return (
    <DarkTextField
      fullWidth
      size="small"
      margin="normal"
      variant="filled"
      InputProps={{ className: classes.input }}
      InputLabelProps={{ shrink: true }}
      FormHelperTextProps={{ className: classes.helperText }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  input: {
    color: theme.palette.textNormal,
  },
  helperText: {
    marginLeft: '4px',
  },
}));
