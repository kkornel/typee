import React from 'react';
import { useForm } from 'react-hook-form';

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
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  input: {
    color: theme.palette.textNormal,
  },
}));
