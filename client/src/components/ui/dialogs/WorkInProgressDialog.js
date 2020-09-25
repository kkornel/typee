import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InteractiveNormalButton from '../buttons/InteractiveNormalButton';

export default function WorkInProgressDialog({
  open,
  text,
  handleDialogClose,
}) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth={'sm'}
      fullWidth={true}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      <DialogTitle
        style={{
          textAlign: 'center',
          color: '#FFFF33',
          textDecoration: 'underline',
        }}
      >
        WORK IN PROGRESS
      </DialogTitle>
      <DialogContent>
        <Box className={classes.image}>
          <img
            className={classes.img}
            src="https://i.imgur.com/8Gvrl4P.png"
            alt="It is supposed to show very important data, but it doesn't :("
          />
        </Box>
        <Box className={classes.content}>
          <p>
            Our team of qualified engineers is aware that you've chosen{' '}
            <b>
              <i>{text}</i>
            </b>
            , but unfortunately they don't know how to handle those files{' '}
            <b>
              <u>YET</u>
            </b>
            .
          </p>
          <p>They're doing everything they can, stay tuned...</p>
        </Box>
      </DialogContent>
      <DialogActions>
        <InteractiveNormalButton onClick={handleDialogClose}>
          OKAY :(
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
  content: {
    color: theme.palette.textNormal,
  },
}));
