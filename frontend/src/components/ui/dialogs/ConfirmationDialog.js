import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InteractiveNormalButton from '../buttons/InteractiveNormalButton';

export default function ConfirmationDialog({
  dialogData,
  onDialogConfirm,
  onDialogCancel,
}) {
  const classes = useStyles();

  const {
    open,
    title,
    content,
    cancelButtonText,
    confirmButtonText,
  } = dialogData;

  return (
    <Dialog
      open={open}
      onClose={onDialogCancel}
      maxWidth={'xs'}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={classes.content}>{content}</DialogContent>
      <DialogActions>
        <InteractiveNormalButton onClick={onDialogCancel}>
          {cancelButtonText}
        </InteractiveNormalButton>
        <InteractiveNormalButton onClick={onDialogConfirm}>
          {confirmButtonText}
        </InteractiveNormalButton>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.backgroundPrimary,
    color: theme.palette.textNormal,
  },
  title: {
    color: theme.palette.red,
  },
  content: {
    color: theme.palette.textNormal,
  },
}));
