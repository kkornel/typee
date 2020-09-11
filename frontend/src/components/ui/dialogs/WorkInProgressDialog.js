import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
      aria-labelledby="form-dialog-name"
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
              <i>{text || 'screenshot.png'}</i>
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
        <Button
          onClick={handleDialogClose}
          className={classes.interactiveNormalButton}
        >
          OKAY :(
        </Button>
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
  img: {
    // width: '532px',
    // height: '323px',
  },
  image: {
    // marginLeft: '110px',
    // marginBottom: '15px',
    // margin: 'auto',
    // width: '50%',
  },
  interactiveNormalButton: {
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.interactiveHover,
      backgroundColor: theme.palette.interactiveMuted,
    },
  },
}));
